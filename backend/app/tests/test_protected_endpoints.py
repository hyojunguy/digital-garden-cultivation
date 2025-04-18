def test_some_protected_endpoint(test_client: TestClient):
    response = test_client.get("/api/v1/some_protected_route")
    assert response.status_code == 200
    # The endpoint will receive mock_test_user as the current user