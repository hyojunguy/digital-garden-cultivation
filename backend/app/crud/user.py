from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.user import User
from app.schemas.user import UserCreate

async def get_user_by_username(db: AsyncSession, *, username: str) -> User | None:
    statement = select(User).where(User.username == username)
    result = await db.execute(statement)
    return result.scalar_one_or_none()

async def create_user(db: AsyncSession, user_in: UserCreate) -> User:
    db_user = User(
        username=user_in.username,
        email=user_in.email,
        password=user_in.password  # Ensure this field is correctly assigned
    )
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)
    return db_user