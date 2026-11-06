# File: backend/app/main.py

from fastapi import FastAPI

from app.modules.safe_space_companion.routes import router as safe_space_router
from app.modules.reporting_navigator.routes import router as reporting_navigator_router
from app.modules.advocacy_network.routes import router as advocacy_network_router


app = FastAPI(
    title="HerHacks API",
    description="Backend API for the HerHacks survivor support platform",
    version="1.0.0"
)


app.include_router(safe_space_router)
app.include_router(reporting_navigator_router)
app.include_router(advocacy_network_router)

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