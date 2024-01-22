from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(500), nullable=False)
    options = db.Column(db.JSON, nullable=False)
    answer = db.Column(db.String(10), nullable=False)
    score = db.Column(db.Integer, nullable=False)