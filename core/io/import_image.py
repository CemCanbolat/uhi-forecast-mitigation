import tensorflow as tf
import rasterio
import numpy as np
from google.cloud import storage
from io import BytesIO
from core.utils import sanitize


def load_tile_from_gcs(city, tile_id, date=None, bucket_name="utfvi-test"):
    client = storage.Client()
    sanitized_city = sanitize(city)

    base_prefix = f"tiles/{sanitized_city}/{tile_id}/"
    blobs = list(client.list_blobs(bucket_name, prefix=base_prefix))

    # Extract date folders from blobs
    date_folders = sorted({b.name.split('/')[3] for b in blobs})

    if not date_folders:
        raise FileNotFoundError(f"No data found for tile {tile_id} in city {city}")

    if date is None:
        date = max(date_folders)  # use latest date folder

    # Find bands file with suffix under that date folder
    candidate_blobs = [b for b in blobs if b.name.startswith(f"{base_prefix}{date}/bands_") and b.name.endswith(".tif")]
    most_recent_blob = max(candidate_blobs, key=lambda b: b.updated)

    if not candidate_blobs:
        raise FileNotFoundError(f"No bands file found for tile {tile_id} in city {city} on date {date}")

    # Assume only one bands file per date folder; else pick the first
    blob = most_recent_blob
    print(blob)
    # Load GeoTIFF bytes from GCS
    with BytesIO(blob.download_as_bytes()) as tif_data:
        with rasterio.open(tif_data) as src:
            data = src.read()  # shape: (bands, height, width)

    if data.shape[0] != 40:
        raise ValueError(f"Expected 40 bands, got {data.shape[0]}")

    # Reshape to (4, 10, 64, 64)
    data = data.reshape((4, 10, 64, 64)).astype(np.float32)

    return data, date  # Return image tensor + date used
