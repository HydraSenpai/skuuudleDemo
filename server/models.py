from app import db

class Book(db.Model):
    __tablename__= 'books'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text)
    upc = db.Column(db.Text)
    product_type = db.Column(db.Text)
    price_excl_tax = db.Column(db.Integer)
    price_incl_tax = db.Column(db.Integer)
    tax = db.Column(db.Integer)
    price = db.Column(db.Integer)
    availability = db.Column(db.Text)
    num_reviews = db.Column(db.Integer)
    stars = db.Column(db.Integer)
    category = db.Column(db.Text)
    description = db.Column(db.Text)
    
    def __repr__(self):
        return f'Book with title {self.title}'
    
class Property(db.Model):
    __tablename__= 'properties'
    
    id = db.Column(db.Integer, primary_key=True)
    property_title = db.Column(db.Text)
    price = db.Column(db.Integer)
    address = db.Column(db.Text)
    bed_count = db.Column(db.Integer)
    property_type = db.Column(db.Text)
    longitude = db.Column(db.Integer)
    latitude = db.Column(db.Integer)
    agent_name = db.Column(db.Text)
    agent_phone = db.Column(db.Text)
    image_link = db.Column(db.Text)
    
    def __repr__(self):
        return f'Property with title {self.property_title}'
    
    def to_dict(self):
        return {
            'id': self.id,
            'property_title': self.property_title,
            'price': self.price,
            'address': self.address,
            'bed_count': self.bed_count,
            'property_type': self.property_type,
            'longitude': self.longitude,
            'latitude': self.latitude,
            'agent_name': self.agent_name,
            'agent_phone': self.agent_phone,
            'image_link': self.image_link
        }
    
    
    
    
    
    
# id int NOT NULL auto_increment, 
# url VARCHAR(255),
# title text,
# upc VARCHAR(255),
# product_type VARCHAR(255),
# price_excl_tax DECIMAL,
# price_incl_tax DECIMAL,
# tax DECIMAL,
# price DECIMAL,
# availability INTEGER,
# num_reviews INTEGER,
# stars INTEGER,
# category VARCHAR(255),
# description text,
# PRIMARY KEY (id)