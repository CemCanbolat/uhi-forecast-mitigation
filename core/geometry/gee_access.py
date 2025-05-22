import ee
from core.config import ASSET_ROOT
from core.utils import sanitize


def get_tile_collection(city_name):
    sanitized_city = sanitize(city_name)
    asset_id = ASSET_ROOT + f"/tiles_NEW_{sanitized_city}"
    print("Getting tiles:",asset_id)
    return ee.FeatureCollection(asset_id)


def get_city_geometry(city_name):
    city_geometries = ee.FeatureCollection(ASSET_ROOT + '/CityPolygons')
    city_feature = city_geometries.filter(ee.Filter.eq('name', city_name)).first()
    city_aoi = city_feature.geometry()
    return city_aoi

