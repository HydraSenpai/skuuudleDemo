from flask import render_template, request, jsonify

from models import Book
from models import Property

def register_routes(app, db):
    
    @app.route('/')
    def index():
        properties = Property.query.all()
        properties_dict = [property.to_dict() for property in properties]  # Convert each object to a dictionary
        return jsonify(properties_dict)


    @app.route('/scrape')
    def scrape(location):
        pass