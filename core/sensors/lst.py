import ee
from .utils import *

def apply_lst_scale(image):
    """Applies the scaling factor to the LST_Day_1km band."""
    lst = image.select('LST_Day_1km') \
                .multiply(0.02) \
                .copyProperties(image, image.propertyNames())
    return lst


def normalize_lst(image, aoi):
  lst_stats = image.reduceRegion(
      reducer = ee.Reducer.minMax(),
      geometry = aoi,
      scale = 250,
      bestEffort = True
  )
  min = ee.Number(lst_stats.get('LST_min'))
  max = ee.Number(lst_stats.get('LST_max'))

  lst_norm = image.select('LST').subtract(min).divide(max.subtract(min))
  return image.addBands(lst_norm.rename('LST'),overwrite=True)


def prepare_lst(start_date, end_date, aoi, interval_days=5, interpolation_days=10, smooth_days=15, sample_days = 15):
    """
    Prepares a preprocessed, interpolated, and normalized LST (Land Surface Temperature)
    ImageCollection from MODIS MOD11A1 data.

    This function performs the following operations:
    - Filters the MODIS LST dataset by date range.
    - Applies scale factors to convert LST to Kelvin or Celsius.
    - Upsamples spatial resolution if needed.
    - Interpolates the collection to regular time intervals.
    - Applies temporal smoothing.
    - Normalizes each image over the provided AOI.
    - Clips the final result to the AOI.
    - Returns the 10 most recent images (i.e., ~50 days if interval_days=5), sorted from oldest to newest.

    Args:
        start_date (str): Start date in 'YYYY-MM-DD' format.
        end_date (str): End date in 'YYYY-MM-DD' format.
        aoi (ee.Geometry): Area of interest for normalization and clipping.
        interval_days (int, optional): Temporal resolution of the output in days. Default is 5.
        interpolation_days (int, optional): Time window used for interpolation (in days). Default is 10.
        smooth_days (int, optional): Time window for temporal smoothing (in days). Default is 15.
        sampling_days (int, optional): Number of days to sample from the collection. Default is 10.

    Returns:
        ee.ImageCollection: An ImageCollection of 10 LST images, preprocessed and clipped to AOI,
                            in chronological order (oldest to newest).
    """

    lst_collection = ee.ImageCollection("MODIS/061/MOD11A1").filterDate(start_date, end_date)

    lst_filtered = lst_collection.map(apply_lst_scale).select('LST_Day_1km')

    lst_reprojected = lst_filtered.map(upsample)

    lst_spaced_interval = regular_spaced_interval(lst_reprojected,"LST_Day_1km", interval_days, interpolation_days).select('LST_Day_1km')

    lst_smoothed = smooth_image_collection(lst_spaced_interval, smooth_days).select('LST_Day_1km_mean')

    lst_smoothed = lst_smoothed.map(lambda img: img.select('LST_Day_1km_mean').rename('LST'))

    lst_reprojected_final = lst_smoothed.map(lambda img:img.reproject(crs='EPSG:4326', scale=250))

    lst_normalized = lst_reprojected_final.map(lambda img: normalize_lst(img, aoi))

    lst_sampled = get_recent_images(lst_normalized, sample_days)

    lst_clipped = lst_sampled.map(lambda img: img.clip(aoi))

    return lst_clipped

