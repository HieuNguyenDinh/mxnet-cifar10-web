import pytest
from server import app
from flask import json, request


# test configuration


@pytest.fixture
def client(request):
    test_client = app.test_client()

    def teardown():
        pass
    request.addfinalizer(teardown)
    return test_client

# test '/'
def test_index(client):
    response = client.get('/')
    assert response.status_code == 200
    print(response.data)
    assert b'Hello' in response.data

# test POST '/process/
def test_predict(client):
    image = "../plane-draw.jpeg"
    data = {'image': (open(image, 'rb'), image)}
    response = client.post('/process', data = data)
    print(response.data)
    assert response.status_code == 200
    expectedRes = {"image$0":{"imgName": "plane-draw.jpeg","prediction": ["airplane","0.39"]}}
    post = json.loads(response.data)
    assert post == expectedRes
