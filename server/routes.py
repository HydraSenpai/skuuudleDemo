from flask import render_template, request, jsonify
import os
from models import Book
from models import Property
import importlib
import sys
import subprocess

def register_routes(app, db):
    
    @app.route('/')
    def index():
        properties = Property.query.all()
        properties_dict = [property.to_dict() for property in properties]  # Convert each object to a dictionary
        return jsonify(properties_dict)


    @app.route('/scrape')
    def scrape():
        # try:
        #     scraper = importlib.import_module(f'scrapy_spider.scraper.spiders.propertyspider')
        #     entry_point = getattr(scraper, 'parse')
        #     entry_point([1])
        # except ModuleNotFoundError:
        #     print('scraper not found')
        cwd = (os.getcwd())
        os.chdir('scrapy_spider/scraper')
    
        try:
            output = subprocess.check_output(['scrapy', 'crawl', 'propertyspider'], stderr=subprocess.STDOUT)
            os.chdir(cwd)
            return {'message': "scraped webpage successfully"}
        except subprocess.CalledProcessError as e:
            print('scraper not working')
            os.chdir(cwd)
            return {'message': "scrape unsuccessful"}
        
        
        
            
            