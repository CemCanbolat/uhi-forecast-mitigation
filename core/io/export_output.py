from google.cloud import storage
import json
import io
from datetime import datetime
from core.utils import sanitize


def dump_to_gcs(data, city_name, date_str=None, bucket_name='uhi-output-data'):
    """
    Uploads the final UHI + mitigation JSON to a GCS bucket.

    Args:
        data (dict): JSON-serializable result.
        city_name (str): City name (e.g., 'Istanbul').
        date_str (str, optional): Defaults to today (UTC).
        bucket_name (str): GCS bucket name (default: 'uhi-output-data').
    """
    if date_str is None:
        date_str = datetime.utcnow().strftime('%Y-%m-%d')

    # Sanitize city name for use in file path
    city_clean = sanitize(city_name)

    # Construct GCS path
    blob_path = f"uhidata/{city_clean}_{date_str}.json"

    # Initialize GCS client and target blob
    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(blob_path)

    # Prepare in-memory buffer for upload
    buffer = io.BytesIO()
    buffer.write(json.dumps(data, indent=2).encode('utf-8'))
    buffer.seek(0)

    # Upload to GCS
    blob.upload_from_file(buffer, content_type='application/json')

    print(f"Uploaded UHI data for {city_name} to: gs://{bucket_name}/{blob_path}")
