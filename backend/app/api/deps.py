from typing import AsyncGenerator
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import ValidationError

from app.core.database import AsyncSessionLocal
from app.core.config import settings
from app.models.user import User  # Correctly import the User model
from app import schemas
from app.crud import user as crud_user

# Define the OAuth2 scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v1/auth/login")

# Make the dependency function async
async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:
        try:
            yield session
        except Exception:
            await session.rollback()
            raise

# Define the get_current_user dependency
async def get_current_user(
    db: AsyncSession = Depends(get_db), token: str = Depends(oauth2_scheme)
) -> User:  # Ensure this references the correct User model
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = schemas.TokenPayload(sub=username)
    except (JWTError, ValidationError):
        raise credentials_exception

    user = await crud_user.get_user_by_username(db, username=token_data.sub)
    if user is None:
        raise credentials_exception
    return user


from app.models.user import User

# Define a mock user object
mock_user = User(
    id=1,
    username="mockuser",
    email="mockuser@example.com",
    # Add other necessary fields from your User model
)

async def mock_get_current_user():
    """
    Mock dependency to bypass authentication and return a predefined mock user.
    """
    return mock_user