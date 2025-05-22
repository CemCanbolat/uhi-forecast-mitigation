import cv2
import numpy as np
from core.config import PREDICTION_THRESHOLD

def clean_tile_mask(mask):
    mask = (mask > PREDICTION_THRESHOLD).astype(np.uint8)

    # Remove small objects
    num_labels, labels, stats, _ = cv2.connectedComponentsWithStats(mask, connectivity=8)
    min_size = 10  # tweak based on scale
    cleaned = np.zeros_like(mask)
    for i in range(1, num_labels):  # skip background
        if stats[i, cv2.CC_STAT_AREA] >= min_size:
            cleaned[labels == i] = 1

    # Optional: dilate/erode to smooth
    kernel = np.ones((2,2), np.uint8)
    smoothed = cv2.morphologyEx(cleaned, cv2.MORPH_CLOSE, kernel)

    return smoothed