import asyncio
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import AsyncSessionLocal
from app.crud.user import create_user
from app.schemas.user import UserCreate

async def init():
    async with AsyncSessionLocal() as session:
        user_in = UserCreate(
            username="admin",
            email="admin@example.com",
            password="admin123",  # Added comma here
        )
        await create_user(db=session, user_in=user_in)
        print("Initial user created.")

if __name__ == "__main__":
    asyncio.run(init())