from flask import render_template, request, jsonify

from models import Book

def register_routes(app, db):
    
    @app.route('/')
    def index():
        books = Book.query.all()
        return jsonify(books)

