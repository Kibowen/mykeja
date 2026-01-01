from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from os import path
from flask_login import LoginManager
try:
    from flask_socketio import SocketIO
except Exception:
    SocketIO = None

db = SQLAlchemy()
socketio = None
if SocketIO is not None:
    socketio = SocketIO(cors_allowed_origins="*")
DB_NAME = "database.db"


def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'tomatoes'
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_NAME}'

    db.init_app(app)
    if socketio is not None:
        socketio.init_app(app)

    from .views import views
    app.register_blueprint(views, url_prefix='/')

    from .models import LandLord
    
    with app.app_context():
        if not path.exists('website/' + DB_NAME):
            db.create_all()
            print('Created Database!')

    login_manager = LoginManager()
    login_manager.login_view = 'views.home'
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(id):
        return LandLord.query.get(int(id))

    return app