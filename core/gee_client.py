import ee
import os
import json
from google.oauth2 import service_account
from dotenv import load_dotenv
from pathlib import Path

# Load .env from project root (one level up from /core)
dotenv_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path)
print(f"Loaded .env from: {dotenv_path}")

# Get environment variables
PROJECT_ID = os.getenv("PROJECT_ID")
SERVICE_ACCOUNT_RELATIVE_PATH = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
print(f"PROJECT_ID: {PROJECT_ID}")
print(f"SERVICE_ACCOUNT_RELATIVE_PATH: {SERVICE_ACCOUNT_RELATIVE_PATH}")

if not PROJECT_ID:
    raise EnvironmentError("Missing PROJECT_ID in environment variables or .env file.")

def authenticate_and_initialize_gee():
    """
    Authenticates with Google Earth Engine using a service account.
    Prioritizes GOOGLE_APPLICATION_CREDENTIALS, then GOOGLE_APPLICATION_CREDENTIALS_JSON,
    then falls back to local service_account.json, and finally to gcloud default auth.
    """
    credentials = None

    if SERVICE_ACCOUNT_RELATIVE_PATH:
        service_account_path = Path(SERVICE_ACCOUNT_RELATIVE_PATH).resolve()
        print(f"Authenticating GEE using GOOGLE_APPLICATION_CREDENTIALS: {service_account_path}")

        if not service_account_path.exists():
            raise FileNotFoundError(f"Service account file not found at: {service_account_path}")

        credentials = service_account.Credentials.from_service_account_file(
            str(service_account_path),
            scopes=[
                'https://www.googleapis.com/auth/earthengine',
                'https://www.googleapis.com/auth/cloud-platform'
            ]
        )
    elif os.environ.get('GOOGLE_APPLICATION_CREDENTIALS_JSON'):
        print("Authenticating GEE using GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable.")
        try:
            key_info = json.loads(os.environ.get('GOOGLE_APPLICATION_CREDENTIALS_JSON'))
            credentials = service_account.Credentials.from_service_account_info(
                key_info,
                scopes=[
                    'https://www.googleapis.com/auth/earthengine',
                    'https://www.googleapis.com/auth/cloud-platform'
                ]
            )
        except json.JSONDecodeError as e:
            print(f"Error decoding GOOGLE_APPLICATION_CREDENTIALS_JSON: {e}")
            raise
    elif Path("service_account.json").exists():
        print("Authenticating GEE using local 'service_account.json'.")
        credentials = service_account.Credentials.from_service_account_file(
            "service_account.json",
            scopes=[
                'https://www.googleapis.com/auth/earthengine',
                'https://www.googleapis.com/auth/cloud-platform'
            ]
        )
    else:
        print("No service account key found. Attempting default gcloud authentication or existing credentials.")
        try:
            ee.Authenticate()
            ee.Initialize(project=PROJECT_ID)
            print("GEE initialized with default authentication.")
            return
        except Exception as e:
            print(f"Default GEE authentication failed: {e}")
            raise

    if credentials:
        try:
            ee.Initialize(
                credentials=credentials,
                project=PROJECT_ID
            )
            print(f"GEE initialized successfully for project: {PROJECT_ID}")
        except Exception as e:
            print(f"Failed to initialize GEE with provided credentials: {e}")
            raise
    else:
        raise Exception("GEE authentication credentials could not be found or loaded.")

# Run authentication on import
# authenticate_and_initialize_gee()
# dem = ee.Image('USGS/SRTMGL1_003')
# xy = ee.Geometry.Point([86.9250, 27.9881])
# elev = dem.sample(xy, 30).first().get('elevation').getInfo()
# print('Mount Everest elevation (m):', elev)
