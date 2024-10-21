from app import create_app
from flask import Flask, render_template, request
import os

flask_app = create_app()

if __name__ == '__main__':
    flask_app.run(host="0.0.0.0", port=5000, debug=True)
    

@flask_app.route('/')
def index():
    return render_template('index.html') 

@flask_app.route('/hello')
def hello():
    return "hello"