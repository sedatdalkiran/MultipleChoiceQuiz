class Config(object):
    SQLALCHEMY_DATABASE_URI = 'sqlite:///quiz.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    DEBUG = False

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False

class TestConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

app_config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'test': TestConfig
}