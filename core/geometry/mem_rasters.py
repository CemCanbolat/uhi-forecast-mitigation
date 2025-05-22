from rasterio.io import MemoryFile
from .tile_transform import add_tile_transformation

def get_mem_rasters(results):
  mem_rasters = []
  for res in results:
    pred = res["prediction"].astype("float32")  # shape (64, 64)

    tile = add_tile_transformation(res["tile"])
    memfile = MemoryFile()
    with memfile.open(
        driver="GTiff",
        height=pred.shape[0],
        width=pred.shape[1],
        count=1,
        dtype=pred.dtype,
        crs="EPSG:3857",
        transform=tile["transform"],
    ) as dst:
        dst.write(pred, 1)

    mem_rasters.append(memfile.open())

    return mem_rasters
  
