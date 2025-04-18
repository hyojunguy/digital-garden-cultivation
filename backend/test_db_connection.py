import os
import asyncio # Import asyncio
from sqlalchemy.ext.asyncio import create_async_engine # Import async engine creator
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# Ensure the URL starts with mysql+aiomysql://
if DATABASE_URL and not DATABASE_URL.startswith("mysql+aiomysql://"):
    print(f"Warning: DATABASE_URL does not specify aiomysql. Current URL: {DATABASE_URL}")
    # Optionally, force it for the test if you are sure aiomysql is installed and intended
    # DATABASE_URL = DATABASE_URL.replace("mysql+pymysql://", "mysql+aiomysql://")

async def test_connection(): # Make the function async
    print(f"Attempting to connect with URL: {DATABASE_URL}")
    if not DATABASE_URL:
        print("Error: DATABASE_URL environment variable not found.")
        return
    if "aiomysql" not in DATABASE_URL:
         print("Error: DATABASE_URL does not specify aiomysql driver.")
         return

    # Use create_async_engine for async operations
    engine = create_async_engine(DATABASE_URL, echo=False) # Set echo=True for more SQL logging if needed

    try:
        # Use async context manager for connection
        async with engine.connect() as connection:
            # You can optionally run a simple query
            # await connection.execute(text("SELECT 1"))
            print("Database connection successful!")
        # Dispose the engine when done with the test
        await engine.dispose()
    except Exception as e:
        print(f"Database connection failed: {e}")
        # Dispose the engine even on error
        await engine.dispose()

if __name__ == "__main__":
    # Run the async function using asyncio.run()
    asyncio.run(test_connection())