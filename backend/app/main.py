# File: backend/app/main.py

from fastapi import FastAPI

from app.modules.safe_space_companion.routes import router as safe_space_router


app = FastAPI(
    title="HerHacks API",
    description="Backend API for the HerHacks survivor support platform",
    version="1.0.0"
)


app.include_router(safe_space_router)


@app.get("/")
def root():
    return {
        "message": "HerHacks API is running!"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }