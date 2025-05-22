from google.cloud import storage
from datetime import datetime
import json
from core.utils import sanitize  
from config import Config
from exceptions import (
    DataNotFoundError,
    InvalidCityError,
    DataFormatError,
    StorageConnectionError,
)

CITY_NAME_MAP = {
    "istanbul":"Istanbul, Turkey",
    "london"  :  "London, UK",
    "rotterdam":"Rotterdam, Netherlands"
}


def preprocess_city_data(data):
    for uhi in data["uhizones"]:
        del uhi["mitigation_values"]
        del uhi["full_geometry"]

    return data

def get_latest_uhi_data(city_name: str) -> dict:
    BUCKET_NAME = Config.GCS_BUCKET
    GCS_CREDS = Config.GCS_CREDENTIALS
    city_id = city_name
    try:
        city_name = CITY_NAME_MAP[city_name]
    except Exception as e:
        raise InvalidCityError(f"Invalid city name: {city_name}")

    try:
        storage_client = storage.Client.from_service_account_json(GCS_CREDS)
        bucket = storage_client.bucket(BUCKET_NAME)
    except Exception as e:
        raise StorageConnectionError(f"Could not connect to storage: {e}")

    city_clean = sanitize(city_name)
    if not city_clean:
        raise InvalidCityError(f"Invalid city name: {city_name}")
    
    prefix = f"uhidata/{city_clean}_"

    try:
        blobs = list(bucket.list_blobs(prefix=prefix))
    except Exception as e:
        raise StorageConnectionError(f"Error listing blobs: {e}")
    
    if not blobs:
        raise DataNotFoundError(f"No data for city {city_name}")

    date_blob_map = {}
    for blob in blobs:
        fname = blob.name.split('/')[-1]
        try:
            date_str = fname.rsplit('_', 1)[1].replace('.json', '')
            date_obj = datetime.strptime(date_str, '%Y-%m-%d')
            date_blob_map[date_obj] = blob
        except Exception:
            continue

    if not date_blob_map:
        raise DataNotFoundError(f"No dated files for city {city_name}")

    latest_date = max(date_blob_map.keys())
    latest_blob = date_blob_map[latest_date]

    try:
        json_bytes = latest_blob.download_as_bytes()
        data = json.loads(json_bytes.decode("utf-8"))
        processed_data = preprocess_city_data(data)
    except Exception as e:
        raise DataFormatError(f"Failed to decode JSON for {latest_blob.name}: {e}")

    # Preprocess here or call another function
    # e.g. data = preprocess(data)

    return {
        "id"  : city_id,
        "name": city_id.capitalize(),
        "date": latest_date.strftime('%Y-%m-%d'),
        "data": processed_data
    }
