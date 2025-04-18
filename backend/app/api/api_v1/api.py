from fastapi import APIRouter

from app.api.api_v1.endpoints import auth, users, contents, scores

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(contents.router, prefix="/contents", tags=["contents"])
api_router.include_router(scores.router, prefix="/scores", tags=["scores"])