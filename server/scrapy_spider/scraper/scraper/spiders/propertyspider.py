import scrapy
import json


class PropertySpider(scrapy.Spider):
    name = "propertyspider"
    allowed_domains = ["www.onthemarket.com"]
    
    def __init__(self, location=None, *args, **kwargs):
        super(PropertySpider, self).__init__(*args, **kwargs)
        self.location = location
        
    # start_urls = ["https://www.onthemarket.com/for-sale/property/glasgow/?view=map-list"]
    
    def start_requests(self):
        # Build the start URL based on the location parameter
        if self.location:
            # Format the start URL to include the location provided
            start_url = f"https://www.onthemarket.com/for-sale/property/{self.location}/?view=map-list"
        else:
            # Fallback to a default location if none is provided
            start_url = "https://www.onthemarket.com/for-sale/property/manchester/?view=map-list"

        yield scrapy.Request(url=start_url, callback=self.parse)

    def parse(self, response):
        properties = response.xpath('//script[@id="__NEXT_DATA__"]/text()').get()
        
        data = json.loads(properties)
        
        property_data = data['props']['pageProps']['results']['list']
        
        for property in property_data:
            home_data = {
                "id" : property.get('id', None),
                "property_title" : property.get('property-title', None),
                "price" : property.get('price', None),
                "address" : property.get('address', None),
                "bed_count" : property.get('bedrooms', None),
                "property_type" :property.get('humanised-property-type', None),
                "longitude" : property.get('location', {}).get('lon', None),
                "latitude" : property.get('location', {}).get('lat', None),
                "agent_name" : property['agent'].get('name', None),
                "agent_phone" : property['agent'].get('telephone', None),
                "image1" : property.get("images", [{}])[0].get("default", None),
            }
              
            yield home_data
            
        # next_page_relative = data.get('props', {}).get('pageProps', {}).get('results', {}).get('paginationControls', {}).get('next', {}).get('next-link', None)
        
        props = data.get('props')
        if props is not None:
            page_props = props.get('pageProps')
            if page_props is not None:
                results = page_props.get('results')
                if results is not None:
                    pagination_controls = results.get('paginationControls')
                    if pagination_controls is not None:
                        next_control = pagination_controls.get('next')
                        if next_control is not None:
                            next_page_relative = next_control.get('next-link', None)
                        else:
                            next_page_relative = None
                    else:
                        next_page_relative = None
                else:
                    next_page_relative = None
            else:
                next_page_relative = None
        else:
            next_page_relative = None

     
        if next_page_relative:
            next_page_absolute = "https://www.onthemarket.com" + next_page_relative
            yield response.follow(next_page_absolute, callback=self.parse)
             