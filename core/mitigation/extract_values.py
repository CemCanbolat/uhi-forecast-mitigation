import ee


def get_mean_remote_sensing_indices(start_date: str, end_date: str, aoi: ee.Geometry):
    """
    Retrieves mean values of LST, NDVI, NDBI, and a proxy Albedo (Normalized Difference Blue-Red Ratio)
    for a given time period and Area of Interest (AOI).

    Args:
        start_date (str): Start date in 'YYYY-MM-DD' format.
        end_date (str): End date in 'YYYY-MM-DD' format.
        aoi (ee.Geometry): Earth Engine Geometry object representing the
                           Area of Interest.

    Returns:
        dict: A dictionary containing the mean values for LST, NDVI, NDBI,
              and Albedo. Returns None for an index if no data is found
              or an error occurs during its calculation.
    """
    results = {}

    # --- LST (Land Surface Temperature in °C) ---
    # MODIS/061/MOD11A1 LST_Day_1km is 1km resolution.
    try:
        lst_collection = ee.ImageCollection("MODIS/061/MOD11A1") \
            .filterDate(start_date, end_date) \
            .filterBounds(aoi) \
            .select("LST_Day_1km")

        if lst_collection.size().getInfo() == 0:
            print(f"Warning: No LST data found for the period {start_date} to {end_date} in AOI.")
            results['LST'] = None
        else:
            lst_image = lst_collection.mean() \
                .multiply(0.02).subtract(273.15) # Scale to Celsius

            lst_reduced = lst_image.reduceRegion(
                reducer=ee.Reducer.mean(),
                geometry=aoi,
                scale=1000 # Use the image's native scale
            )

            lst_value = lst_reduced.get("LST_Day_1km").getInfo()
            if lst_value is None:
                 print(f"Warning: LST reduction yielded no data for AOI in period {start_date} to {end_date}.")
            results['LST'] = lst_value

    except ee.EEException as e:
        print(f"Error calculating LST: {e}")
        results['LST'] = None

    # --- NDVI ---
    # MODIS/061/MOD13A1 NDVI is 500m resolution.
    try:
        ndvi_collection = ee.ImageCollection("MODIS/061/MOD13A1") \
            .filterDate(start_date, end_date) \
            .filterBounds(aoi) \
            .select("NDVI")

        if ndvi_collection.size().getInfo() == 0:
            print(f"Warning: No NDVI data found for the period {start_date} to {end_date} in AOI.")
            results['NDVI'] = None
        else:
            ndvi_image = ndvi_collection.mean().multiply(0.0001) # Scale NDVI

            # Using nominalScale() for robustness
            ndvi_scale = ndvi_image.select("NDVI").projection().nominalScale()

            ndvi_reduced = ndvi_image.clip(aoi).reduceRegion(
                reducer=ee.Reducer.mean(),
                geometry=aoi,
                scale=500 # Use the image's native scale
            )

            ndvi_value = ndvi_reduced.get("NDVI").getInfo()

            if ndvi_value is None:
                 print(f"Warning: NDVI reduction yielded no data for AOI in period {start_date} to {end_date}.")
            results['NDVI'] = ndvi_value

    except ee.EEException as e:
        print(f"Error calculating NDVI: {e}")
        results['NDVI'] = None

    # --- NDBI & Proxy Albedo (from Landsat) ---
    # Filter Landsat data once for both NDBI and Albedo.
    # Landsat 8 SR_B* bands are 30m resolution.
    try:
        landsat_collection = ee.ImageCollection("LANDSAT/LC08/C02/T1_L2") \
            .filterBounds(aoi) \
            .filterDate(start_date, end_date) \
            .filter(ee.Filter.lt('CLOUD_COVER', 30)) \
            .map(lambda img: img.select(['SR_B2', 'SR_B4', 'SR_B5', 'SR_B6']) # Select necessary bands early
                             .multiply(0.0000275).add(-0.2)
                             .copyProperties(img, ['system:time_start', 'system:index']))

        if landsat_collection.size().getInfo() == 0:
            print(f"Warning: No Landsat data (cloud cover < 30%) found for the period {start_date} to {end_date} in AOI.")
            results['NDBI'] = None
            results['Albedo'] = None
        else:

            # --- NDBI ---
            def compute_ndbi(image):
                swir = image.select("SR_B6")
                nir = image.select("SR_B5")
                # Ensure denominator is not zero
                ndbi_calc = swir.subtract(nir).divide(swir.add(nir)).rename("NDBI")
                return ndbi_calc.updateMask(swir.add(nir).neq(0))

            ndbi_img = landsat_collection.map(compute_ndbi).mean()

            ndbi_reduced = ndbi_img.clip(aoi).reduceRegion(
                reducer=ee.Reducer.mean(),
                geometry=aoi,
                scale=30 # Use the native Landsat scale
            )

            ndbi_value = ndbi_reduced.get("NDBI").getInfo()
            if ndbi_value is None:
                 print(f"Warning: NDBI reduction yielded no data for AOI in period {start_date} to {end_date}.")
            results['NDBI'] = ndbi_value

            # --- Albedo (Normalized Difference Red and Blue) ---
            def compute_normalized_difference_red_blue(image):
                red = image.select("SR_B4")
                blue = image.select("SR_B2")
                # Ensure denominator is not zero
                nd_red_blue_calc = red.subtract(blue).divide(red.add(blue)).rename("Albedo") # Renamed for consistency
                return nd_red_blue_calc.updateMask(red.add(blue).neq(0))


            albedo_img = landsat_collection.map(compute_normalized_difference_red_blue).mean()

            albedo_reduced = albedo_img.clip(aoi).reduceRegion(
                reducer=ee.Reducer.mean(),
                geometry=aoi,
                scale=30,
                maxPixels=1e9
            )
            
            # Corrected: The band created is named "Albedo", not "Albedo_mean"
            albedo_value = albedo_reduced.get("Albedo").getInfo()
            if albedo_value is None:
                 print(f"Warning: Albedo reduction yielded no data for AOI in period {start_date} to {end_date}.")
            results['Albedo'] = albedo_value

    except ee.EEException as e:
        print(f"Error calculating NDBI or Albedo from Landsat: {e}")
        results['NDBI'] = None
        results['Albedo'] = None

    return results


def extract_values_for_uhis(uhi_zones, start_date, end_date):
    for uhi in uhi_zones:
        aoi = ee.Geometry(uhi["geometry"])
        uhi["mitigation_values"] = get_mean_remote_sensing_indices(start_date, end_date, aoi)
    return uhi_zones