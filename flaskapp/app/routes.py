from flask import request, jsonify
from flask import app
from .models import Question
import random
import json

def configure_routes(app):
    @app.route('/api/questions', methods=['GET'])
    def get_questions():
        questions = Question.query.all()
        random.shuffle(questions)
        return jsonify([{'text': q.text, 'options': q.options, 'id': q.id} for q in questions])

    @app.route('/api/submit', methods=['POST'])
    def submit_answers():
        data = request.json
        score = 0
        correct_answers = 0
        wrong_answers = []

        for answer in data['answers']:
            question = Question.query.get(answer['question_id'])
            if question and question.answer == answer['answer']:
                score += question.score
                correct_answers += 1
            else:
                wrong_answers.append({'question': question.text, 'correct_answer': question.answer})

        result = {
            'total_score': score,
            'correct_answers': correct_answers,
            'wrong_answers': wrong_answers
        }
        return jsonify(result)

    @app.route('/api/validate_answer', methods=['POST'])
    def validate_answer():
        data = request.get_json()
        print('Data received:', data)

        question_id = data['questionId']
        selected_option = data['selectedOption']
        print('Question ID:', question_id, 'Selected Option:', selected_option)

        question = Question.query.get(question_id)
        print('Question Retrieved:', question)

        if not question:
            return jsonify({'message': 'Question not found'}), 404

        options = question.options
        if isinstance(options, str):
            try:
                options = json.loads(options)
            except json.JSONDecodeError:
                print('Error decoding options JSON')
                return jsonify({'message': 'Invalid question options format'}), 500

        correct_answer_value = options.get(question.answer, 'Unknown option')
        print('Correct Answer:', correct_answer_value)

        is_correct = question.answer == selected_option
        print('Is Correct:', is_correct)

        if is_correct:
            return jsonify({'correct': True, 'score': question.score})
        else:
            return jsonify({'correct': False, 'correctAnswer': f'{question.answer}: {correct_answer_value}'})
