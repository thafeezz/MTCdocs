import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import chat

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=(["*"] if os.getenv("ENV") == "dev" else [""]),
    allow_credentials=True,
    allow_methods=["POST"]
    allow_header=["*"]
)

app.include_router(chat.router, prefix="/api/chat", tags=["chat"])