import geopandas as gpd
from core.config import UHI_ZONE_BUFFER, UHI_ZONE_MIN_AREA

def post_process_gdf(gdf):

  # 1. Vectorize & convert CRS to meters
  gdf = gdf.to_crs("EPSG:3857")  # Ensure CRS in meters

  # 2. Buffer to merge close zones first
  buffered = gdf.buffer(UHI_ZONE_BUFFER)

  # 3. Union all geometries into merged blobs
  merged = buffered.union_all()

  # 4. Explode into individual geometries
  gdf_merged = gpd.GeoDataFrame(geometry=[merged], crs=gdf.crs).explode(index_parts=False).reset_index(drop=True)

  # 5. Filter based on the **area of merged zones**
  gdf_filtered = gdf_merged[gdf_merged.area > UHI_ZONE_MIN_AREA]

  return gdf_filtered
