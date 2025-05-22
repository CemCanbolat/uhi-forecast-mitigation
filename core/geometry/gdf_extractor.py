from .clean_tiles import clean_tile_mask
import geopandas as gpd
from rasterio.features import shapes
from shapely.geometry import shape
from core.config import PREDICTION_THRESHOLD
import numpy as np

def extract_gdf(merged_array, merged_transform):
  """
  Extracts geometries from a raster array using a threshold.
  Args:
      merged_array (numpy.ndarray): The raster array to extract geometries from.
      merged_transform (rasterio.transform.Affine): The affine transform of the raster.
      Returns:
      gpd.GeoDataFrame: A GeoDataFrame containing the extracted geometries.
  """

  raster = merged_array > PREDICTION_THRESHOLD 
  mask = clean_tile_mask(raster)

  # Extract features where mask == 1
  geoms = []
  for geom, val in shapes(mask.astype(np.uint8), mask=mask == 1, transform=merged_transform):
      if val == 1:
          geoms.append(shape(geom))

  gdf = gpd.GeoDataFrame(geometry=geoms, crs="EPSG:3857")
  gdf = gdf.buffer(0)
  return gdf