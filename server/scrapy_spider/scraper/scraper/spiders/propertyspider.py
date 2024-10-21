import scrapy
import json


class PropertySpider(scrapy.Spider):
    name = "propertyspider"
    allowed_domains = ["www.onthemarket.com"]
    start_urls = ["https://www.onthemarket.com/for-sale/property/manchester/?view=map-list"]

    def parse(self, response):
        properties = response.xpath('//script[@id="__NEXT_DATA__"]/text()').get()
        
        data = json.loads(properties)
        
        property_data = data['props']['pageProps']['results']['list']
        
        for property in property_data:
            home_data = {
                "id" : property.get('id', None),
                "price" : property.get('price', None),
                "address" : property.get('address', None),
                "bed_count" : property.get('bedrooms', None),
                "property_type" :property.get('humanised-property-type', None),
                "longitude" : property.get('location', {}).get('lon', None),
                "latitude" : property.get('location', {}).get('lat', None),
                "agent_name" : property['agent'].get('name', None),
                "agent_phone" : property['agent'].get('telephone', None),
            }
              
            yield home_data
     