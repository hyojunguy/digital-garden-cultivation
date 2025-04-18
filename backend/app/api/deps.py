from typing import AsyncGenerator
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session
from app.core.database import AsyncSessionLocal
from app.db.session import SessionLocal
from app.models.user import User

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:
        try:
            yield session
        except Exception:
            await session.rollback()
            raise

# Simple get_current_user function without OAuth2
async def get_current_user():
    # Return mock user for now
    return User(
        id=1,
        username="mockuser",
        email="mockuser@example.com",
    )

# Mock user for testing
mock_user = User(
    id=1,
    username="mockuser",
    email="mockuser@example.com",
)

async def mock_get_current_user():
    return mock_user