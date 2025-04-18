from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
import logging
from app.api.deps import get_db
from app.models.user import User
from app.schemas.user import UserLogin, Token
from app.core.security import verify_password, create_access_token

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/login")
async def login(user_login: UserLogin, db: AsyncSession = Depends(get_db)):
    logger.info(f"Login attempt for username: {user_login.username}")
    
    query = select(User).where(User.username == user_login.username)
    result = await db.execute(query)
    user = result.scalar_one_or_none()
    
    if not user:
        logger.error(f"User not found: {user_login.username}")
        raise HTTPException(status_code=401, detail="Invalid username or password")
    
    logger.info(f"User found: {user.username}")
    logger.info(f"Verifying password for user: {user.username}")
    
    is_valid = verify_password(user_login.password, user.password)
    logger.info(f"Password verification result: {is_valid}")

    if not is_valid:
        logger.error(f"Invalid password for user: {user.username}")
        raise HTTPException(status_code=401, detail="Invalid username or password")
    
    access_token = create_access_token(data={"sub": user.username})
    logger.info(f"Login successful for user: {user.username}")
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email
        }
    }