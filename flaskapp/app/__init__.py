from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from .models import db
from .routes import configure_routes
from flask_migrate import Migrate

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///quiz.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    migrate = Migrate(app, db)

    with app.app_context():
        db.create_all()

    CORS(app, resources={r"/api/*": {"origins": "*"}})

    configure_routes(app)

    return app