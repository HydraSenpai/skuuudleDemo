from flask import Flask, render_template, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import os

db = SQLAlchemy()


def create_app():
    app = Flask(__name__, template_folder='templates')
    
    CORS(app)
    
    uri = 'mysql+pymysql://root:' + os.environ.get("MYSQL_PASS") + '@localhost/nicholasdatabase'
    app.config['SQLALCHEMY_DATABASE_URI'] = uri
    
    db.init_app(app)
    
    from routes import register_routes
    register_routes(app, db)
    
    migrate = Migrate(app, db)
    
    return app
    






    
