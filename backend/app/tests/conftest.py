# Example using pytest fixtures in e.g., app/tests/conftest.py
import pytest
from fastapi.testclient import TestClient
from app.main import app # Import your FastAPI app instance
from app.api.deps import get_current_user # Import the original dependency
from app.tests.overrides import override_get_current_user # Import the override function

@pytest.fixture(scope="module")
def test_client() -> TestClient:
    # Apply the dependency override
    app.dependency_overrides[get_current_user] = override_get_current_user

    # Create the test client
    client = TestClient(app)
    yield client # Use the client in tests

    # Clean up: remove the override after tests are done
    app.dependency_overrides.clear()

# Your tests can now use the test_client fixture
# def test_some_protected_endpoint(test_client: TestClient):
#     response = test_client.get("/api/v1/some_protected_route")
#     assert response.status_code == 200
#     # The endpoint will receive mock_test_user as the current user