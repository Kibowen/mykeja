from . import db
from flask_login import UserMixin


class LandLord (db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.String(150))
    First_name = db.Column(db.String(150))
    second_name = db.Column(db.String(150))
    


