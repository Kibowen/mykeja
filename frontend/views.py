from flask import Blueprint, render_template, request, redirect, url_for, flash
from flask_login import login_required, current_user 



views = Blueprint('views', __name__)

@views.route('/')
def home():
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