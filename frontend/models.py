from . import db
from flask_login import UserMixin


# password database
class LandLord (db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.String(150))
    first_name = db.Column(db.String(150))
    second_name = db.Column(db.String(150))
    

# Apartment model
class Apartment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    building_name = db.Column(db.String(150))
    unit_number = db.Column(db.String(150))
    tenant_count = db.Column(db.Integer)
    caretaker = db.Column(db.String(150))
    landlord_id = db.Column(db.Integer, db.ForeignKey('land_lord.id'))
