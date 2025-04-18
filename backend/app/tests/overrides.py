# Create a new file for test overrides, e.g., app/tests/overrides.py
from app.models.user import User # Import your User model

# Define a mock user object that matches your User model structure
# Adjust the fields and values as needed for your tests
mock_test_user = User(
    id=1,
    username="testuser",
    email="test@example.com",
    # Add other necessary fields from your User model, potentially with default/mock values
    # e.g., hashed_password="fakehashedpassword", created_at=datetime.utcnow(), etc.
    # Ensure all non-nullable fields in your User model are present
)

async def override_get_current_user() -> User:
    """
    Mock dependency to bypass authentication and return a predefined test user.
    """
    return mock_test_user

# You might also want an override for the database session if needed for tests
# async def override_get_db():
#     # Logic to provide a test database session
#     pass