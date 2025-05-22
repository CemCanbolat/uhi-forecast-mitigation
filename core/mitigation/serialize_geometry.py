import ee

def serialize_geometries(uhi_zones):
  # full geometry is the Polygon
  # geometry is the Point
  for uhi in uhi_zones:
    uhi_geom = ee.Geometry(uhi["geometry"])
    uhi_centroid = uhi_geom.centroid(maxError=1)

    uhi["full_geometry"] = uhi_geom.getInfo()
    uhi["geometry"] = uhi_centroid.getInfo()
  return uhi_zones