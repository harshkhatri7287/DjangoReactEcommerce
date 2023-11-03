import json
import sys, os, django

sys.path.append("/home/bh-cp0083/Desktop/H_Kart/server") #here store is root folder(means parent).
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "server.settings")
django.setup()

from products.models import Product

def import_product_data(json_file):
    with open(json_file, 'r') as file:
        products = json.load(file)
        for product_data in products:
            product = Product.objects.create(
                name=product_data['name'],
                price=product_data['price'],
                description=product_data['description'],
                category=product_data['category']
            )
            print(f"Imported product: {product.name}")

if __name__ == '__main__':
    json_file = '../media/products.json'
    import_product_data(json_file)