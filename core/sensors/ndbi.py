import ee
from .utils import *


def mask_landsat(image):
    qa_pixel = image.select('QA_PIXEL')

    # Bitmasks
    cloud = 1 << 3
    cloud_shadow = 1 << 4
    snow = 1 << 5
    water = 1 << 7

    # Create mask
    mask = qa_pixel.bitwiseAnd(cloud).eq(0)\
        .And(qa_pixel.bitwiseAnd(cloud_shadow).eq(0))\
        .And(qa_pixel.bitwiseAnd(snow).eq(0))\
        .And(qa_pixel.bitwiseAnd(water).eq(0))

    return image.updateMask(mask).copyProperties(image, ['system:time_start'])

def calculate_ndbi(image):
    # Landsat 8: SWIR = B6, NIR = B5
    scaled = image.select(['SR_B5', 'SR_B6']).multiply(0.0000275).add(-0.2)

    # NDBI = (SWIR - NIR) / (SWIR + NIR)
    ndbi = scaled.normalizedDifference(['SR_B6', 'SR_B5']).rename('NDBI')
    return image.select([]).addBands(ndbi)

def create_biweekly_ndbi(image_collection, start_date, end_date):
    def make_composite(start):
        start_date = ee.Date(start)
        end_date = start_date.advance(14, 'day')
        images = image_collection.filterDate(start_date, end_date)
        median_ndbi = images.select('NDBI').median()
        return median_ndbi.set('system:time_start', start_date.millis())

    start_dates = ee.List.sequence(ee.Date(start_date).millis(), ee.Date(end_date).millis(), 1000 * 60 * 60 * 24 * 14)
    return ee.ImageCollection(start_dates.map(lambda d: make_composite(ee.Number(d))))

def normalize_ndbi(image_collection):
  def normalize_image(image, p2, p98):
      ndbi = image.select('NDBI')
      # (NDBI - min) / (max - min)
      ndbi_norm = ndbi.subtract(p2).divide(p98.subtract(p2)).clamp(0, 1)
      return image.addBands(ndbi_norm.rename('NDBI'), overwrite=True)

  ndbi_stats = (
      image_collection.select('NDBI')
      .reduce(ee.Reducer.percentile([2, 98]))
  )

  p2 = ndbi_stats.select('NDBI_p2')
  p98 = ndbi_stats.select('NDBI_p98')
  return image_collection.map(lambda img: normalize_image(img, p2, p98))

def prepare_ndbi(start_date, end_date, aoi, interval_days=5, spatial_interpolate_day=45, interpolation_days=35, smooth_days=15, sample_days = 15):
    """
    Prepares a preprocessed and interpolated NDBI (Normalized Difference Built-up Index)
    ImageCollection using Landsat 8 surface reflectance data.

    This function performs the following steps:
    - Loads Landsat 8 Level 2 surface reflectance data and filters by date.
    - Applies a QA-based cloud, shadow, snow, and water mask.
    - Computes NDBI from each image.
    - Aggregates images into biweekly composites.
    - Applies spatial interpolation to fill gaps within the AOI.
    - Interpolates to regular temporal intervals and applies smoothing.
    - Renames and reprojects images to a consistent CRS and resolution.
    - Returns the `sample_days` most recent images (e.g., last 50 days).
    - Clips the final result to the AOI.

    Args:
        start_date (str): Start date in 'YYYY-MM-DD' format.
        end_date (str): End date in 'YYYY-MM-DD' format.
        aoi (ee.Geometry): Area of interest for normalization and clipping.
        interval_days (int, optional): Temporal resolution of the output in days. Default is 5.
        spatial_interpolate_day (int, optional): Number of days for spatial interpolation window. Default is 45.
        interpolation_days (int, optional): Time window for temporal interpolation. Default is 35.
        smooth_days (int, optional): Time window for temporal smoothing. Default is 15.
        sample_days (int, optional): Number of interpolated time points to return. Default is 10.

    Returns:
        ee.ImageCollection: A cleaned, smoothed, and clipped NDBI ImageCollection,
                            ordered from oldest to most recent.
    """
    landsat_collection = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2').filterDate(start_date, end_date)

    filtered_landsat = landsat_collection.map(mask_landsat)

    with_ndbi = filtered_landsat.map(calculate_ndbi)

    ndbi_biweekly = create_biweekly_ndbi(with_ndbi, start_date, end_date)

    ndbi_reprojected = ndbi_biweekly.map(downsample)

    ndbi_collection = spatial_interpolate(ndbi_reprojected, "NDBI", aoi, spatial_interpolate_day).select("NDBI")

    ndbi_spaced_interval = regular_spaced_interval(ndbi_collection, "NDBI", interval_days, interpolation_days).select('NDBI')

    ndbi_smoothed = smooth_image_collection(ndbi_spaced_interval, smooth_days).select('NDBI_mean')

    ndbi_smoothed_renamed = ndbi_smoothed.map(lambda img: img.select('NDBI_mean').rename('NDBI'))

    ndbi_reprojected_final = ndbi_smoothed_renamed.map(lambda img:img.reproject(crs='EPSG:4326', scale=250))

    ndbi_sampled = get_recent_images(ndbi_reprojected_final, sample_days)

    ndbi_clipped = ndbi_sampled.map(lambda img: img.clip(aoi))

    return ndbi_clipped