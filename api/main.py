from dotenv import load_dotenv
from pathlib import Path
from fastapi.middleware.cors import CORSMiddleware
import os

env_path = Path(__file__).parent / ".env"
if not env_path.exists():
    env_path = Path("/app/.env")
load_dotenv(dotenv_path=env_path)

from fastapi import FastAPI, Request
from routes import router
from fastapi.responses import JSONResponse
from exceptions import (
    DataNotFoundError,
    InvalidCityError,
    DataFormatError,
    StorageConnectionError,
)

app = FastAPI(title="UHI Forecast API")

"""
uvicorn api.main:app --reload --port 8001
"""

origins = os.getenv("CORS_ORIGINS", "").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.exception_handler(DataNotFoundError)
async def data_not_found_handler(request: Request, exc: DataNotFoundError):
    return JSONResponse(status_code=404, content={"detail": str(exc)})

@app.exception_handler(InvalidCityError)
async def invalid_city_handler(request: Request, exc: InvalidCityError):
    return JSONResponse(status_code=400, content={"detail": str(exc)})

@app.exception_handler(DataFormatError)
async def data_format_handler(request: Request, exc: DataFormatError):
    return JSONResponse(status_code=422, content={"detail": str(exc)})

@app.exception_handler(StorageConnectionError)
async def storage_connection_handler(request: Request, exc: StorageConnectionError):
    return JSONResponse(status_code=503, content={"detail": str(exc)})

@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    return JSONResponse(status_code=500, content={"detail": "Internal server error"})

app.include_router(router)
