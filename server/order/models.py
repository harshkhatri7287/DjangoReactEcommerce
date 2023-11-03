from django.db import models
from django.contrib.auth.models import User
from products.models import Product
from user_auth.models import UserAddress

class OrderData(models.Model):
    orderid = models.AutoField(primary_key=True) 
    user = models.ForeignKey(User, on_delete=models.CASCADE, to_field='id')
    address = models.ForeignKey(UserAddress, on_delete=models.CASCADE, to_field="profileid")
    products = models.ManyToManyField(Product)
    products_quantities = models.JSONField(default=dict)
    order_date = models.DateField()


    def __str__(self):
        return str(self.orderid)+'_'+str(self.user.first_name)+'_'+str(self.address.profileid)
