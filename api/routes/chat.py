from fastapi import APIRouter


router = APIRouter()

@router.post("/message")
async def handle_message():
    