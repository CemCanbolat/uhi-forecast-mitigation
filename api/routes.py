from fastapi import APIRouter, Query
from services import get_latest_uhi_data

router = APIRouter()

@router.get("/latest_uhi_data")
async def latest_uhi_data(city: str = Query(..., description="City name")):
    return get_latest_uhi_data(city)


@router.get("/health", tags=["Health"])
async def health():
    return {"status": "ok"}