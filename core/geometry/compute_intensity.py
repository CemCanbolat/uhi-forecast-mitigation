import numpy as np
from shapely.geometry import mapping
from rasterio.features import geometry_mask


def compute_intensity_scores(pred_array, transform, zones_gdf):
    scores = []
    for geom in zones_gdf.geometry:
        # Create a mask of the shape
        mask = geometry_mask(
            [mapping(geom)],
            transform=transform,
            invert=True,
            out_shape=pred_array.shape
        )

        zone_values = pred_array[mask]
        zone_values = zone_values[~np.isnan(zone_values)]  # Just in case

        if len(zone_values) == 0:
            score = 0
        else:
            score = np.mean(zone_values)

        scores.append(score)

    raw_scores = np.array(scores)

    if np.all(np.isnan(raw_scores)) or raw_scores.size == 0:
        zones_gdf["intensity"] = np.nan
        zones_gdf["raw_mean"] = raw_scores
        return zones_gdf
    # Normalize scores between 0–1
    mean = raw_scores.mean()
    std = raw_scores.std()

    if std == 0:
        z_scores = np.zeros_like(raw_scores)  # avoid division by zero
    else:
        z_scores = (raw_scores - mean) / std

    def sigmoid(x):
      return 1 / (1 + np.exp(-x))

    norm_scores = sigmoid(z_scores)
    zones_gdf["intensity"] = norm_scores
    zones_gdf["raw_mean"] = scores

    return zones_gdf