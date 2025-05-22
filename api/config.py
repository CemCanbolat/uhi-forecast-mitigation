import os
from dotenv import load_dotenv
from pathlib import Path

env_path = Path(__file__).parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

class Config:
    GCS_BUCKET = os.getenv("GCS_BUCKET", "uhi-output-data")
    GCS_CREDENTIALS = os.getenv("BACKEND_APPLICATION_CREDENTIALS")
