import ee
from .utils import *


def mask_NDVI(image):
    summary_qa = image.select('SummaryQA')

    # Keep only good and marginal pixels
    mask = summary_qa.eq(0).Or(summary_qa.eq(1))

    # Masked and scaled NDVI
    ndvi = image.select('NDVI').updateMask(mask).multiply(0.0001)

    # Add original properties back to the new image
    ndvi = ndvi.copyProperties(image, image.propertyNames())

    return ndvi


def prepare_ndvi(start_date, end_date, aoi, interval_days=5, spatial_interpolate_day=30, interpolation_days=30, smooth_days=15, sample_days = 15):
    """
    Prepares a preprocessed, interpolated, and smoothed NDVI (Normalized Difference Vegetation Index)
    ImageCollection from MODIS MOD13A1 data.

    This function performs the following operations:
    - Filters the MODIS NDVI dataset by date range.
    - Masks invalid NDVI values using a custom mask.
    - Upsamples the spatial resolution of each image.
    - Applies spatial interpolation to reduce missing data within the AOI.
    - Interpolates to regular time intervals.
    - Applies temporal smoothing over the interpolated images.
    - Renames and reprojects the output to a consistent CRS and scale.
    - Selects the most recent `sample_days` worth of images (e.g., 10 × 5 = last 50 days).
    - Clips the final results to the AOI.

    Args:
        start_date (str): Start date in 'YYYY-MM-DD' format.
        end_date (str): End date in 'YYYY-MM-DD' format.
        aoi (ee.Geometry): Area of interest for normalization and clipping.
        interval_days (int, optional): Temporal resolution of the output in days. Default is 5.
        spatial_interpolate_day (int, optional): Number of days for spatial interpolation window. Default is 30.
        interpolation_days (int, optional): Time window used for temporal interpolation. Default is 30.
        smooth_days (int, optional): Time window for temporal smoothing. Default is 15.
        sample_days (int, optional): Number of interpolated time points to return. Default is 10.

    Returns:
        ee.ImageCollection: An ImageCollection of NDVI images, cleaned and clipped to AOI,
                            in chronological order (oldest to newest).
    """
    ndvi_collection = ee.ImageCollection("MODIS/061/MOD13A1").filterDate(start_date, end_date)

    ndvi_filtered = ndvi_collection.map(mask_NDVI).select('NDVI')

    ndvi_reprojected = ndvi_filtered.map(upsample)

    ndvi_spatial_interpolated = spatial_interpolate(ndvi_reprojected, "NDVI", aoi, spatial_interpolate_day).select("NDVI")

    ndvi_interpolate_sampled = regular_spaced_interval(ndvi_spatial_interpolated, "NDVI", interval_days, interpolation_days).select('NDVI')

    ndvi_smoothed = smooth_image_collection(ndvi_interpolate_sampled, smooth_days).select('NDVI_mean')

    ndvi_smoothed = ndvi_smoothed.map(lambda img: img.select('NDVI_mean').rename('NDVI'))

    ndvi_reprojected_final = ndvi_smoothed.map(lambda img:img.reproject(crs='EPSG:4326', scale=250))

    ndvi_sampled = get_recent_images(ndvi_reprojected_final, sample_days)

    ndvi_clipped = ndvi_sampled.map(lambda img: img.clip(aoi))

    return ndvi_clipped