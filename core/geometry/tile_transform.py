import pyproj
from rasterio.transform import from_origin
from shapely.geometry import shape
from shapely.ops import transform as shapely_transform


def add_tile_transformation(tile_dict):

    pixel_size = 250  # meters per pixel

    # Convert tile geometry from EPSG:4326 to EPSG:3857
    geom_4326 = shape(tile_dict["geometry"])
    project = pyproj.Transformer.from_crs("EPSG:4326", "EPSG:3857", always_xy=True).transform
    geom_3857 = shapely_transform(project, geom_4326)

    # Get bounding box in meters
    minx, _, _, maxy = geom_3857.bounds # miny, maxx ruled out

    # Compute transform: top-left origin
    transform = from_origin(minx, maxy, pixel_size, pixel_size)

    tile_dict["transform"] = transform
    return tile_dict