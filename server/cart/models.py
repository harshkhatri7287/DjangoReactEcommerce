from django.db import models
from django.contrib.auth.models import User
from products.models import Product

class Cart(models.Model):
    cartid = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, to_field='id')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, to_field='productid')
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return str(self.cartid) + '_' +  str(self.user.first_name) 
    
