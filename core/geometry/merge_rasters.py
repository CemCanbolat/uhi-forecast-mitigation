import numpy as np
from rasterio.merge import merge


def mean_merge_rasters(mem_rasters):
  """
  Merges multiple raster arrays using the mean of their values.
  Args:
      mem_rasters (list): List of raster arrays to merge.
      Returns:
      tuple: A tuple containing the mean merged array and the transform of the merged raster.
  """
  # Merge using "sum"
  sum_array, merged_transform = merge(mem_rasters, method="sum")

  # Merge using "count" to get number of valid contributions per pixel
  count_array, _ = merge(mem_rasters, method="count")

  # Compute mean safely, ignoring divide-by-zero
  with np.errstate(divide='ignore', invalid='ignore'):
      mean_array = np.true_divide(sum_array, count_array)
      mean_array[count_array == 0] = np.nan

  return mean_array[0] , merged_transform