# Remove or comment out synchronous imports if they exist
# from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker # Use async versions
from sqlalchemy.orm import declarative_base # Keep declarative_base
import os
from dotenv import load_dotenv

load_dotenv() # Ensure .env is loaded

DATABASE_URL = os.getenv("DATABASE_URL")

# Use create_async_engine
engine = create_async_engine(DATABASE_URL, pool_pre_ping=True, echo=False) # Set echo=True for debugging SQL

# Use async_sessionmaker and configure it for async sessions
AsyncSessionLocal = async_sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
    expire_on_commit=False # Recommended for async usage
)

Base = declarative_base()

# The get_db dependency will be updated separately (likely in deps.py)