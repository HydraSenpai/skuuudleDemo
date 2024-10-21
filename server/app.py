from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import os

db = SQLAlchemy()


def create_app():
    app = Flask(__name__, template_folder='templates')
    uri = 'mysql+pymysql://root:' + os.environ.get("MYSQL_PASS") + 'password@localhost/nicholasdatabase'
    app.config['SQLALCHEMY_DATABASE_URI'] = uri
    
    db.init_app(app)
    
    migrate = Migrate(app, db)
    
    return app
    






    
