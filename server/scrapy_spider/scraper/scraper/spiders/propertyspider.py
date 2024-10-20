import scrapy


class PropertySpider(scrapy.Spider):
    name = "propertyspider"
    allowed_domains = ["www.openrent.co.uk"]
    start_urls = ["https://www.openrent.co.uk/properties-to-rent/manchester?term=Manchester&prices_min=100&prices_max=500"]

    def parse(self, response):
        properties = response.css('div.listing-info')
        
        minprice = 500
        maxprice = 600
        
        for property in properties:
              
            yield {
                'name': (property.css('div.ldc span::text').get()).strip(),
                'price': (property.css('div.pim.pl-title h2::text').get()).strip(),
                'distance': (property.css('div.ltc.pl-title h2::text').get()).strip(),
            }
        
        if maxprice < 10000:
            minprice += 100
            maxprice += 100
            next_page = "https://www.openrent.co.uk/properties-to-rent/manchester?term=Manchester" + "&prices_min=" + minprice + "&prices_max=" + maxprice
            yield response.follow(next_page, callback=self.parse)
     