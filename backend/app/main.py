import logging
from fastapi import FastAPI
from app.api.deps import get_current_user, mock_get_current_user
from app.api.endpoints.upload import router as upload_router
from app.api.endpoints.contents import router as contents_router
from app.api.endpoints.scores import router as scores_router  # Import scores router

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)  # Define the logger

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add this before including routers
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload_router, prefix="/api")
app.include_router(contents_router, prefix="/api/v1")
app.include_router(scores_router, prefix="/api/v1")  # Include scores router

@app.middleware("http")
async def log_requests(request, call_next):
    logger.info(f"Incoming request: {request.method} {request.url}")
    response = await call_next(request)
    logger.info(f"Response status: {response.status_code}")
    return response

# Apply the mock dependency override in development
if app.debug:  # or use an environment variable to toggle this
    app.dependency_overrides[get_current_user] = mock_get_current_user

# Import the settings module
from .config import settings  # Adjust the import path based on your project structure

@app.get("/")
async def root():
    return {"message": f"Welcome to {settings.PROJECT_NAME} API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)