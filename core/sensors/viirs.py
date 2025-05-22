import ee
from .utils import *

def create_date_intervals(start_date, end_date, interval):
    n_intervals = end_date.difference(start_date, 'day').floor().getInfo() // interval

    # Create a list of start and end date pairs
    date_tuples = ee.List.sequence(0, n_intervals- 1).map(
        lambda i: ee.List([
            start_date.advance(ee.Number(i).multiply(interval), 'day').format('YYYY-MM-dd'),
            start_date.advance(ee.Number(i).add(1).multiply(interval), 'day').format('YYYY-MM-dd')
        ])
    )
    return date_tuples


def normalize_viirs(image_collection):
  def normalize_image(image, p2, p98):
      viirs = image.select('avg_rad')
      # (NDBI - min) / (max - min)
      viirs_norm = viirs.subtract(p2).divide(p98.subtract(p2)).clamp(0, 1)
      return image.addBands(viirs_norm.rename('avg_rad'), overwrite=True)

  viirs_stats = (
      image_collection.select('avg_rad')
      .reduce(ee.Reducer.percentile([2, 98]))
  )

  p2 = viirs_stats.select('avg_rad_p2')
  p98 = viirs_stats.select('avg_rad_p98')
  return image_collection.map(lambda img: normalize_image(img, p2, p98))

def viirs_fill_and_repeat(image_collection: ee.ImageCollection, date_list, analysis_start_date, analysis_end_date) -> ee.ImageCollection:

    def find_closest(date_pair):
        start = ee.Date(ee.List(date_pair).get(0))
        closest = image_collection.filterDate(analysis_start_date, start.advance(1, 'day'))\
                                  .sort('system:time_start', False).first()

        fallback = image_collection.filterDate(start, analysis_end_date).sort('system:time_start').first()
        return ee.Algorithms.If(
            closest,
            ee.Image(closest).set('system:time_start', start.millis()).reproject(crs='EPSG:4326', scale=250),
            None
        )

    return ee.ImageCollection.fromImages(date_list.map(find_closest))

def prepare_viirs(start_date,end_date, aoi, interval_days=5, sample_days = 15):
  """
    Prepares a temporally resampled and normalized VIIRS nighttime light ImageCollection
    using the VCMSLCFG product.

    This function performs the following operations:
    - Loads VIIRS DNB monthly average radiance data over the date range.
    - Extends the analysis window slightly before and after the date range.
    - Upsamples spatial resolution if needed.
    - Forward Fills and replicates values to match desired time intervals.
    - Normalizes radiance values.
    - Renames and reprojects to a consistent CRS and scale.
    - Returns the most recent `sample_days` images.

    Args:
        start_date (str): Start date in 'YYYY-MM-DD' format.
        end_date (str): End date in 'YYYY-MM-DD' format.
        aoi (ee.Geometry): Area of interest to clip output images.
        interval_days (int, optional): Temporal spacing between output images. Default is 5.
        sample_days (int, optional): Number of most recent images to return. Default is 10.

    Returns:
        ee.ImageCollection: A collection of resampled and clipped VIIRS images, ordered chronologically.
    """
  ee_start_date = ee.Date(start_date)
  ee_end_date = ee.Date(end_date)

  analysis_start_date = ee_start_date.advance(-1,"month")
  analysis_end_date = ee_end_date.advance(15,"day")
  common_date_interval = create_date_intervals(ee_start_date, ee_end_date, interval_days)

  viirs_collection = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG').filterDate(start_date, end_date)
  viirs_filtered = viirs_collection.select('avg_rad')
  viirs_reprojected = viirs_filtered.map(upsample)

  viirs_interval_sampled = viirs_fill_and_repeat(viirs_reprojected, common_date_interval, analysis_start_date, analysis_end_date)

  viirs_norm = normalize_viirs(viirs_interval_sampled)

  viirs_renamed = viirs_norm.map(lambda img: img.select('avg_rad').rename('VIIRS'))

  viirs_reprojected_final = viirs_renamed.map(lambda img: img.reproject(crs='EPSG:4326', scale=250))

  viirs_sampled = get_recent_images(viirs_reprojected_final, sample_days)

  viirs_final = viirs_sampled.map(lambda img: img.clip(aoi))


  return viirs_final