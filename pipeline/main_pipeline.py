import time
import ee
from datetime import datetime
from .mitigation_pipeline import mitigation_pipeline
from core.io import *
from core.model import *
from core.geometry import *
from core.sensors.composer import construct_dataset
from core.utils import sanitize


def run_city_prediction_pipeline(
    city_name,
    start_date,
    end_date,
    model,
    bucket='utfvi-test',
    export_only=False,
    max_tasks=300,
    send_to_frontend=True
):
    """
    Full pipeline to run UHI prediction and mitigation for a city.

    Args:
        city_name (str): City name (e.g., 'Berlin, Germany')
        start_date (str): Dataset start date
        end_date (str): Dataset end date
        model (tf.keras.Model): Loaded prediction model
        bucket (str): GCS bucket where tiles are exported
        export_only (bool): Skip prediction and mitigation steps
        max_tasks (int): Limit on concurrent export tasks
        send_to_frontend (bool): Whether to post-process and send results

    Returns:
        dict of results or None
    """
    print(f"\nStarting pipeline for {city_name} from {start_date} to {end_date}...")
    # 1. Geometry & tiles

    city_aoi = get_city_geometry(city_name)
    city_tiles = get_tile_collection(city_name).getInfo()["features"]
    harmonized_image = construct_dataset(start_date, end_date, city_aoi)
    export_date = datetime.utcnow().strftime('%Y-%m-%d')

    # 2. Export tiles to GCS
    started_tasks, skipped_tasks = [], []

    for idx, tile in enumerate(city_tiles):

      if len(started_tasks) >= max_tasks:
            skipped_tasks.append(tile)
            continue

      task = export_tile_to_gcs(harmonized_image, ee.Feature(tile), city_name, export_date, bucket)
      time.sleep(0.3)

      task.start()

      started_tasks.append((tile["id"], task.id))

      print(f"Export started for tile {tile['id']}")


    wait_for_tasks(started_tasks)

    if skipped_tasks:
        print(f"\n{len(skipped_tasks)} remaining tiles will now be exported...")
        second_batch = []
        for tile in skipped_tasks:
            task = export_tile_to_gcs(harmonized_image, ee.Feature(tile), city_name, export_date, bucket)

            task.start()
            second_batch.append((tile["id"], task.id))
            print(f"Export started for tile {tile['id']}")

        wait_for_tasks(second_batch)

    if export_only:
        print("Export-only mode: Skipping prediction & mitigation.")
        return

    print("Waiting for files to load")
    print()
    time.sleep(60)

    results = []

    # 3. Import the COG as Tensor
    for tile in city_tiles:
        tile_id = tile["id"]

        try:
            data, date_used = load_tile_from_gcs(city_name, tile_id, bucket_name=bucket)

            prediction = predict_tile(model, data)

            results.append({
                "tile": tile,
                "date": date_used,
                "prediction": prediction  # Remove batch dim if needed
            })

            print(f"Prediction completed for tile {tile_id}\n")

        except Exception as e:
            print(f"Failed to load/predict for tile {tile_id}: {str(e)}")


    # From Predictions to gee geometries:
    mem_rasters = get_mem_rasters(results)
    
    merged_array, merged_transformation = mean_merge_rasters(mem_rasters)

    gdf = extract_gdf(merged_array, merged_transformation) # mask done here

    print("Found Zones:\n",gdf)
    gdf = post_process_gdf(gdf)

    gdf = compute_intensity_scores(merged_array, merged_transformation, gdf)

    gdf_4326 = gdf.to_crs("EPSG:4326")
    print("Post processed",gdf_4326)
    # Construct list of UHI zones
    uhi_zones = []

    for idx, row in gdf_4326.iterrows():
        geom = row.geometry
        intensity = row["intensity"]

        if geom.is_empty or not geom.is_valid:
            continue

        geojson = geom.__geo_interface__
        ee_geom = ee.Geometry(geojson)

        uhi_zones.append({
            "UHI_ID": sanitize(city_name)+"_"+ str(idx),
            "UHI_Intensity": round(float(intensity), 4),
            "geometry": ee_geom
        })

    today_str = datetime.utcnow().strftime('%Y-%m-%d')
    mitigated_uhis = mitigation_pipeline(start_date, end_date, uhi_zones)

    final_output = {
        "city_name":city_name,
        "date":today_str,
        "uhizones":mitigated_uhis
    }

    # dump the data
    if send_to_frontend:
        print("Dumping to GCS")
        dump_to_gcs(final_output, city_name, today_str)

    return final_output
