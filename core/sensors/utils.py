import ee

def upsample(image, scale:int=250, method:str='bilinear'):
    return image.resample(method).reproject(crs='EPSG:4326', scale=scale)

def downsample(image, scale: int = 250):
    return image.setDefaultProjection(crs='EPSG:4326', scale=scale).reduceResolution(
        reducer=ee.Reducer.mean(),
        bestEffort=True
    ).reproject(crs='EPSG:4326', scale=scale)

def rename_band(img, old_band_name, new_band_name):
  return img.addBands(img.select(old_band_name).rename(new_band_name))

def interpolate(image, band_name):
    image = ee.Image(image)
    before = ee.List(image.get('before'))
    after = ee.List(image.get('after'))

    before_mosaic = ee.ImageCollection.fromImages(before).mosaic()
    after_mosaic = ee.ImageCollection.fromImages(after).mosaic()

    t1 = before_mosaic.select('timestamp')
    t2 = after_mosaic.select('timestamp')
    t = image.metadata('system:time_start')

    time_ratio = t.subtract(t1).divide(t2.subtract(t1))

    y1 = before_mosaic.select(band_name)
    y2 = after_mosaic.select(band_name)

    interpolated = y1.add((y2.subtract(y1).multiply(time_ratio)))
    result = image.unmask(interpolated)
    return result.copyProperties(image, ['system:time_start'])


# 1- Spatial Interpolation
def spatial_interpolate(image_collection, band_name, aoi, days=30):
  # image_collection : original image collection
  # aoi : Area Of Interest ( city geometry )
  # days : time window to get before after images.
  clipped_ic = image_collection.map(lambda img: img.clip(aoi))

  def add_time_band(image):
      timeImage = image.metadata('system:time_start').rename('timestamp')
      timeImageMasked = timeImage.updateMask(image.mask().select(0))
      return image.addBands(timeImageMasked).toFloat()

  ic_with_time = clipped_ic.map(add_time_band)

  millis = ee.Number(days).multiply(1000 * 60 * 60 * 24)


  maxDiffFilter = ee.Filter.maxDifference(difference=millis,
                                            leftField='system:time_start',
                                            rightField='system:time_start')

  lessEqFilter = ee.Filter.lessThanOrEquals(leftField = 'system:time_start',
                                            rightField= 'system:time_start')

  greaterEqFilter = ee.Filter.greaterThanOrEquals(leftField = 'system:time_start',
                                                  rightField= 'system:time_start')

  filter1 = ee.Filter.And(maxDiffFilter, lessEqFilter)

  join1 = ee.Join.saveAll(matchesKey='after', ordering='system:time_start', ascending=False)
  join1Result = join1.apply(primary=ic_with_time, secondary=ic_with_time, condition=filter1)

  filter2 = ee.Filter.And(maxDiffFilter, greaterEqFilter)

  join2 = ee.Join.saveAll(matchesKey='before',ordering='system:time_start', ascending=True)
  join2Result = join2.apply(primary=join1Result, secondary=join1Result, condition=filter2)

  interpolated = ee.ImageCollection(join2Result.map(lambda img: interpolate(img,band_name)))
  return interpolated


#2 Temporal Sampling with Interval'
def regular_spaced_interval(image_collection, band_name, interval_days=5, interpolation_days=30):
  # image_collection: the image collection to work on
  # interval days: How many days would be interpolated per image
  # interpolation_days: Time range of interpolation

  bandNames = ee.Image(image_collection.first()).bandNames()
  numbands = bandNames.size()

  initBands = ee.List.repeat(ee.Image(),numbands)
  initImage = ee.ImageCollection(initBands).toBands().rename(bandNames)


  firtsImage = ee.Image(image_collection.sort('system:time_start').first())
  lastImage = ee.Image(image_collection.sort('system:time_start',False).first())
  time_start = ee.Date(firtsImage.get('system:time_start'))
  time_end = ee.Date(lastImage.get('system:time_start'))

  total_days = time_end.difference(time_start, 'day')
  daysToInterpolate = ee.List.sequence(0,total_days,interval_days)

  # Step 2: Create empty NDVI images for each 8-day period
  def create_empty_date_image(day):
      image = initImage.set({
          'system:index': ee.Number(day).format('%d'),
          'system:time_start': time_start.advance(day,'day').millis(),
          'type': 'interpolated'
      })
      return image

  initImages = daysToInterpolate.map(create_empty_date_image)
  init_col = ee.ImageCollection.fromImages(initImages)

  merged = image_collection.merge(init_col)

  def add_time_band(image):
      timeImage = image.metadata('system:time_start').rename('timestamp')
      timeImageMasked = timeImage.updateMask(image.mask().select(0))
      return image.addBands(timeImageMasked).toFloat()

  merged_with_time = merged.map(add_time_band)

  days = interpolation_days
  millis = ee.Number(days).multiply(1000 * 60 * 60 * 24)

  max_diff_filter = ee.Filter.maxDifference(
      difference=millis,
      leftField='system:time_start',
      rightField='system:time_start'
  )
  less_eq_filter = ee.Filter.lessThanOrEquals(
      leftField='system:time_start',
      rightField='system:time_start'
  )
  greater_eq_filter = ee.Filter.greaterThanOrEquals(
      leftField='system:time_start',
      rightField='system:time_start'
  )

  filter1 = ee.Filter.And(max_diff_filter, less_eq_filter)

  join1 = ee.Join.saveAll(matchesKey='after', ordering='system:time_start', ascending=False)
  join1Result = join1.apply(primary=merged_with_time, secondary=merged_with_time, condition=filter1)

  filter2 = ee.Filter.And(max_diff_filter, greater_eq_filter)

  join2 = ee.Join.saveAll(matchesKey='before', ordering='system:time_start', ascending=True)
  join2Result = join2.apply(primary=join1Result, secondary=join1Result, condition=filter2)

  interpolated_col = ee.ImageCollection(join2Result.map(lambda img: interpolate(img,band_name)))
  interpolate_sampled = interpolated_col.filter(ee.Filter.eq('type', 'interpolated'))
  return interpolate_sampled


def smooth_image_collection(image_collection, days=15):

  millis = ee.Number(days).multiply(1000 * 60 * 60 * 24)
  join = ee.Join.saveAll(matchesKey='images')

  diffFilter = ee.Filter.maxDifference(
      difference=millis,
      leftField='system:time_start',
      rightField='system:time_start')

  joinedCollection = join.apply(primary=image_collection,
                                secondary=image_collection,
                                condition=diffFilter)

  def extract_and_compute_mean(image):
    matchingImages = ee.ImageCollection.fromImages(image.get('images'))
    meanImage = matchingImages.reduce(ee.Reducer.mean())
    return ee.Image(image).addBands(meanImage)

  smoothed_collection = ee.ImageCollection(joinedCollection.map(extract_and_compute_mean))
  return smoothed_collection

def get_recent_images(lst_collection, count=10):
    """
    Return the most recent `count` images from an Earth Engine ImageCollection,
    ordered from oldest to newest.

    Parameters:
        lst_collection (ee.ImageCollection): The input image collection.
        count (int): Number of most recent images to return.

    Returns:
        ee.ImageCollection: A collection of `count` most recent images, sorted chronologically.
    """
    sorted_desc = lst_collection.sort('system:time_start', False)
    recent_list = sorted_desc.toList(count)
    recent_collection = ee.ImageCollection(recent_list)
    recent_sorted = recent_collection.sort('system:time_start')
    return recent_sorted
