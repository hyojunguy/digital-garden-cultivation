import logging
from fastapi import FastAPI
# from app.api.deps import get_current_user, mock_get_current_user  # Commented out auth deps
from app.api.endpoints.upload import router as upload_router
from app.api.endpoints.contents import router as contents_router
from app.api.endpoints.scores import router as scores_router
from app.api.endpoints.auth import router as auth_router

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload_router, prefix="/api")
app.include_router(contents_router, prefix="/api/v1")
app.include_router(scores_router, prefix="/api/v1")
app.include_router(auth_router, prefix="/api/v1/auth")

@app.middleware("http")
async def log_requests(request, call_next):
    logger.info(f"Incoming request: {request.method} {request.url}")
    response = await call_next(request)
    logger.info(f"Response status: {response.status_code}")
    return response

# Comment out the mock dependency override
# if app.debug:
#     app.dependency_overrides[get_current_user] = mock_get_current_user

from .config import settings

@app.get("/")
async def root():
    return {"message": f"Welcome to {settings.PROJECT_NAME} API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)