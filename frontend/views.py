from flask import Blueprint, render_template, request, redirect, url_for, flash
from flask_login import login_required, current_user, login_user, logout_user
from werkzeug.security import generate_password_hash, check_password_hash
from . import db
from .models import LandLord



views = Blueprint('views', __name__)

@views.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        if 'signup' in request.form:
            # Handle signup form submission
            email = request.form.get('email')
            first_name = request.form.get('firstName')
            second_name = request.form.get('secondName')
            password1 = request.form.get('password1')
            password2 = request.form.get('password2')

            user = LandLord.query.filter_by(email=email).first()
            if user:
                flash('Email already exists.', category='error')
            elif password1 != password2:
                flash('Passwords do not match.', category='error')
            else:
                new_user = LandLord(email=email, first_name=first_name, second_name=second_name, password=generate_password_hash(password1, method='sha256'))
                db.session.add(new_user)
                db.session.commit()
                login_user(new_user, remember=True)
                flash('Account created!', category='success')
                return redirect(url_for('views.lordview'))
            
        elif 'login' in request.form:
            # Handle login form submission
            email = request.form.get('email')
            password = request.form.get('password1')

            user = LandLord.query.filter_by(email=email).first()
            if user:
                if check_password_hash(user.password, password):
                    flash('Logged in successfully', category='success')
                    login_user(user, remember=True)
                    return redirect(url_for('views.lordview'))
                else:
                    flash('Incorrect password, try again.', category='error')
            else:
                flash('Email does not exist.', category='error')

    return render_template("index.html")


    
@views.route('/dashboard')
@login_required
def lordview():
    return render_template("landlordview.html")

@views.route('/new-building', methods=['GET', 'POST'])
@login_required
def new_building():
#     form = NewBuildingForm()
#     if form.validate_on_submit():
#         # process form data and save new building to database
#         flash('New building created successfully!', 'success')
#         return redirect(url_for('views.dashboard'))
    return render_template('landlord.html')

@views.route('/logout')
@login_required
def logout():
    logout_user()
    flash('Logged out successfully')
    return redirect(url_for('views.home'))

