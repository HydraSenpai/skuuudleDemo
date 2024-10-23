from flask import render_template, request, jsonify
import os
from models import Book
from models import Property
import importlib
import sys
import subprocess
import pandas as pd

def register_routes(app, db):
    
    @app.route('/')
    def index():
        properties = Property.query.all()
        properties_dict = [property.to_dict() for property in properties]  # Convert each object to a dictionary
        return jsonify(properties_dict)
    
    @app.route('/location')
    def get_location():
        
        location = request.args.get('location')
        
        if not location:
            return jsonify({'error': 'Location parameter is required'}), 400
        
        properties = Property.query.filter(Property.address.ilike(f'%{location}%')).all()
        properties_dict = [property.to_dict() for property in properties]  # Convert each object to a dictionary
        
        df = pd.DataFrame(properties_dict)

        if not df.empty:
            # Mean price of properties, rounded to 2 decimal places
            mean_price = round(df['price'].mean(), 2)

            # Mean bed count of properties, rounded to 2 decimal places
            mean_bed_count = round(df['bed_count'].mean(), 2)

            # Mean price by property type, rounded to 2 decimal places
            mean_price_by_type = df.groupby('property_type')['price'].mean().apply(lambda x: round(x, 2)).to_dict()

            # Lowest and highest prices (no need for rounding, as they are usually integers)
            lowest_price = df['price'].min()
            highest_price = df['price'].max()
        else:
            mean_price = 0
            mean_bed_count = 0
            mean_price_by_type = {}
            lowest_price = 0
            highest_price = 0

        # Return both the properties and the mean price in the JSON response
        return jsonify({
            'mean_price': mean_price,
            'mean_bed_count': mean_bed_count,
            'mean_price_by_type': mean_price_by_type,
            'lowest_price': lowest_price,
            'highest_price': highest_price,
            'properties_length':len(properties_dict),
            'properties': properties_dict,
        })


    @app.route('/scrape')
    def scrape():
        # try:
        #     scraper = importlib.import_module(f'scrapy_spider.scraper.spiders.propertyspider')
        #     entry_point = getattr(scraper, 'parse')
        #     entry_point([1])
        # except ModuleNotFoundError:
        #     print('scraper not found')
        
        user_input = request.json.get('location')
        
        # Change directory to one that runs spider
        cwd = (os.getcwd())
        os.chdir('scrapy_spider/scraper')
    
        try:
            # run spider
            output = subprocess.check_output(['scrapy', 'crawl', 'propertyspider', '-a', f'location={user_input}'], stderr=subprocess.STDOUT)
            os.chdir(cwd)
            return {'message': "scraped webpage successfully"}
        except subprocess.CalledProcessError as e:
            print('scraper not working')
            os.chdir(cwd)
            return {'message': "scrape unsuccessful"}
        
        
        
            
            