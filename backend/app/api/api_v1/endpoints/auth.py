from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app import crud
from app.api import deps
from app.schemas.user import User, UserCreate  # Correctly import User and UserCreate schemas

router = APIRouter()

@router.post("/register", response_model=User)  # Use the correctly imported User schema
async def register_user(
    *,
    db: AsyncSession = Depends(deps.get_db),
    user_in: UserCreate  # Use the correctly imported UserCreate schema
):
    user = await crud.user.get_user_by_username(db, username=user_in.username)
    if user:
        raise HTTPException(status_code=400, detail="Username already registered")
    user = await crud.user.create_user(db=db, user_in=user_in)
    return user