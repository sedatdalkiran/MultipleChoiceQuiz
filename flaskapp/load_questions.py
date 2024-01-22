import os
import json
from app import create_app, db
from app.models import Question

def load_questions():
    app = create_app()
    with app.app_context():
        
        questions_json_path = os.path.join(os.path.dirname(__file__), 'data/questions.json')
        with open(questions_json_path, 'r') as file:
            questions = json.load(file)
            for q in questions:
                question = Question(
                    text=q['text'],
                    options=json.dumps(q['options']),
                    answer=q['answer'],
                    score=q['score']
                )
                db.session.add(question)
            db.session.commit()

if __name__ == '__main__':
    load_questions()