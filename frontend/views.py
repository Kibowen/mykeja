from flask import Blueprint, render_template, request, redirect, url_for, flash
from flask_login import login_required, current_user, login_user, logout_user
from werkzeug.security import generate_password_hash, check_password_hash
from . import db, socketio
from .models import LandLord, Apartment



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
    apartments = Apartment.query.filter_by(landlord_id=current_user.id).all()
    # Build a JSON-serializable representation for client-side charts
    apartments_data = []
    for a in apartments:
        apartments_data.append({
            'id': a.id,
            'building_name': a.building_name,
            'unit_number': a.unit_number,
            'tenant_count': a.tenant_count if a.tenant_count is not None else 0,
            'caretaker': a.caretaker,
            'image_url': getattr(a, 'image_url', '')
        })
    return render_template("landlordview.html", apartments=apartments, apartments_data=apartments_data)

@views.route('/new-building', methods=['POST'])
@login_required
def new_building():
    if request.method == 'POST':
        building_name = request.form.get('building')
        unit_number = request.form.get('unit')
        tenant_count = request.form.get('tenant')
        caretaker = request.form.get('caretaker')

        new_building = Apartment(
            building_name=building_name, 
            unit_number=unit_number, 
            tenant_count=tenant_count, 
            caretaker=caretaker, 
            landlord_id=current_user.id
        )
        db.session.add(new_building)
        db.session.commit()
        # emit updated apartments list to connected clients
        apartments = Apartment.query.filter_by(landlord_id=current_user.id).all()
        apartments_data = []
        for a in apartments:
            apartments_data.append({
                'id': a.id,
                'building_name': a.building_name,
                'unit_number': a.unit_number,
                'tenant_count': a.tenant_count if a.tenant_count is not None else 0,
                'caretaker': a.caretaker,
                'image_url': getattr(a, 'image_url', '')
            })
        if socketio is not None:
            socketio.emit('apartments_update', {'apartments': apartments_data})
        flash('Building added successfully', category='success')
        return redirect(url_for('views.lordview'))
    return redirect(url_for('views.lordview'))

@views.route('/delete-building/<int:id>', methods=['POST'])
@login_required
def delete_building(id):
    apartment = Apartment.query.get_or_404(id)
    if apartment.landlord_id != current_user.id:
        flash('You do not have permission to delete this building', category='error')
        return redirect(url_for('views.lordview'))
    
    db.session.delete(apartment)
    db.session.commit()
    # emit updated apartments list
    apartments = Apartment.query.filter_by(landlord_id=current_user.id).all()
    apartments_data = []
    for a in apartments:
        apartments_data.append({
            'id': a.id,
            'building_name': a.building_name,
            'unit_number': a.unit_number,
            'tenant_count': a.tenant_count if a.tenant_count is not None else 0,
            'caretaker': a.caretaker,
            'image_url': getattr(a, 'image_url', '')
        })
    if socketio is not None:
        socketio.emit('apartments_update', {'apartments': apartments_data})
    flash('Building deleted successfully', category='success')
    return redirect(url_for('views.lordview'))

@views.route('/update-building/<int:id>', methods=['POST'])
@login_required
def update_building(id):
    apartment = Apartment.query.get_or_404(id)
    if apartment.landlord_id != current_user.id:
        flash('You do not have permission to update this building', category='error')
        return redirect(url_for('views.lordview'))
    
    apartment.building_name = request.form.get('building')
    apartment.unit_number = request.form.get('unit')
    apartment.tenant_count = request.form.get('tenant')
    apartment.caretaker = request.form.get('caretaker')
    
    db.session.commit()
    # emit updated apartments list
    apartments = Apartment.query.filter_by(landlord_id=current_user.id).all()
    apartments_data = []
    for a in apartments:
        apartments_data.append({
            'id': a.id,
            'building_name': a.building_name,
            'unit_number': a.unit_number,
            'tenant_count': a.tenant_count if a.tenant_count is not None else 0,
            'caretaker': a.caretaker,
            'image_url': getattr(a, 'image_url', '')
        })
    if socketio is not None:
        socketio.emit('apartments_update', {'apartments': apartments_data})
    flash('Building updated successfully', category='success')
    return redirect(url_for('views.lordview'))

@views.route('/logout')
@login_required
def logout():
    logout_user()
    flash('Logged out successfully')
    return redirect(url_for('views.home'))

