import ee
from datetime import datetime
import random
import string
from core.utils import sanitize

def extract_tile_info(tile) -> tuple[str, ee.Geometry]:
  tile_feature = ee.Feature(tile)

  id = tile_feature.id().getInfo()
  geometry = ee.Geometry(tile_feature.geometry())

  return id, geometry


def export_tile_to_gcs(image, tile, city_name, export_date, bucket='utfvi-test'):
    """
    Exports a clipped image for a given tile to GCS in a structured format:
    gs://<bucket>/tiles/<city>/<tile_id>/<export_date>/bands.tif
    """
    tile_id, tile_geometry = extract_tile_info(tile)
    sanitized_city = sanitize(city_name)
    sanitized_date = export_date.replace('-', '')

    # Optional: reproject if needed
    image_reprojected = image.reproject(crs='EPSG:3857', scale=250)

    unique_suffix = datetime.utcnow().strftime('%f') + ''.join(
    random.choices(string.ascii_lowercase + string.digits, k=5))

    description = f"{city_name}_{tile_id}_{export_date}_{unique_suffix}"
    gcs_path = f"tiles/{sanitized_city}/{tile_id}/{sanitized_date}/bands_{unique_suffix}"
    print("Path:",gcs_path)
    task = ee.batch.Export.image.toCloudStorage(
        image=image_reprojected.clip(tile_geometry),
        description=description,
        bucket=bucket,
        fileNamePrefix=gcs_path,
        region=tile_geometry,
        crs='EPSG:3857',
        scale=250,
        fileFormat='GeoTIFF',
        formatOptions={'cloudOptimized': True}
    )
    return task
