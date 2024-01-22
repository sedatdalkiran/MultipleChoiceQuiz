import pytest
import requests

def test_validate_correct_answer():
    url = 'http://127.0.0.1:5000/api/validate_answer'
    
    headers = {
        'Content-Type': 'application/json'
    }
    
    payload_correct_answer = {
        "questionId": 1,
        "selectedOption": "b"
    }
    
    response = requests.post(url, json=payload_correct_answer, headers=headers)
    
    assert response.status_code == 200, "Status code is not 200"
    
    response_data = response.json()
    assert response_data == {"correct": True, "score": 100}, "Correct Answer"
    
def test_validate_incorrect_answer():
    url = 'http://127.0.0.1:5000/api/validate_answer'
    
    headers = {
        'Content-Type': 'application/json'
    }

    payload_incorrect_answer = {
        "questionId": 1,
        "selectedOption": "a"
    }
    
    response_incorrect_answer = requests.post(url, json=payload_incorrect_answer, headers=headers)

    assert response_incorrect_answer.status_code == 200
    response_data = response_incorrect_answer.json()
    assert response_data == {"correct": False, "correctAnswer": "b"}, "Response data is not as expected"

def test_get_questions():
    url = 'http://127.0.0.1:5000/api/questions'

    response = requests.get(url)
    assert response.status_code == 200
