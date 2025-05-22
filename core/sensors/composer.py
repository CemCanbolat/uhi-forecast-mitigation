import ee
from .lst import prepare_lst
from .ndbi import prepare_ndbi
from .ndvi import prepare_ndvi
from .viirs import prepare_viirs

def construct_dataset(start_date, end_date, city_aoi):
    """
    Constructs a harmonized dataset of LST, NDVI, NDBI, and VIIRS images using the most recent
    common time window of 10 timestamps at 5-day intervals.
    """
    print("[INFO] Starting construct_dataset()")
    print(f"Start Date: {start_date}, End Date: {end_date}")

    # Load sampled collections
    lst_col = prepare_lst(start_date, end_date, city_aoi, interval_days=5, interpolation_days=10, smooth_days=15, sample_days=20)
    ndvi_col = prepare_ndvi(start_date, end_date, city_aoi, interval_days=5, spatial_interpolate_day=30, interpolation_days=30, smooth_days=15, sample_days=20)
    ndbi_col = prepare_ndbi(start_date, end_date, city_aoi, interval_days=5, spatial_interpolate_day=45, interpolation_days=35, smooth_days=15, sample_days=20)
    viirs_col = prepare_viirs(start_date, end_date, city_aoi, interval_days=5, sample_days=20)

    print("[INFO] Image counts per band:")
    print("LST:", lst_col.size().getInfo())
    print("NDVI:", ndvi_col.size().getInfo())
    print("NDBI:", ndbi_col.size().getInfo())
    print("VIIRS:", viirs_col.size().getInfo())

    # Helper: get the latest date in the collection
    def latest_date(col):
        return ee.Date(col.aggregate_array('system:time_start').sort().get(-1))

    # Find latest common date across all bands
    latest_common_date = ee.Date(
        ee.List([
            latest_date(lst_col),
            latest_date(ndvi_col),
            latest_date(ndbi_col),
            latest_date(viirs_col)
        ]).reduce(ee.Reducer.min())
    )
    print("[DEBUG] Latest common date:", latest_common_date.format('YYYY-MM-dd').getInfo())

    # Create list of 10 dates at 5-day intervals backwards
    first_date_for_sequence = latest_common_date.advance(ee.Number(9).multiply(-5), 'day')
    date_list = ee.List.sequence(0, 9).map(
        lambda i: first_date_for_sequence.advance(ee.Number(i).multiply(5), 'day')
    )
    print("[DEBUG] Target aligned timestamps:")
    print([ee.Date(d['value']).format("YYYY-MM-dd").getInfo() for d in date_list.getInfo()])

    def build_stack(col, band):
        def get_image(date):
            d = ee.Date(date)
            i = date_list.indexOf(date)

            filtered = col.filterDate(d, d.advance(1, 'day')).sort('system:time_start')
            first_img = filtered.first()

            def make_empty():
                return ee.Image.constant(0).rename(band).clip(city_aoi).set('system:time_start', d.millis())

            img_safe = ee.Image(ee.Algorithms.If(first_img, first_img.select(band), make_empty()))
            band_name = ee.String(band).cat('_').cat(ee.Number(i).format('%d'))
            return img_safe.rename(band_name)

        images = date_list.map(get_image)
        return ee.ImageCollection.fromImages(images).toBands()

    # Build stacks
    lst_stack = build_stack(lst_col, 'LST')
    ndvi_stack = build_stack(ndvi_col, 'NDVI')
    ndbi_stack = build_stack(ndbi_col, 'NDBI')
    viirs_stack = build_stack(viirs_col, 'VIIRS')

    # Combine into final stack
    final_stack = lst_stack.addBands(ndvi_stack).addBands(ndbi_stack).addBands(viirs_stack).float()
    return final_stack
