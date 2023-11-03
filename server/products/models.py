from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Product(models.Model):

    productid = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    price = models.IntegerField()
    description = models.TextField()
    category = models.CharField(max_length=50)
    sub_category = models.CharField(max_length=50, default="karton")
    brand = models.CharField(max_length=50, default="karton")
    image = models.ImageField(upload_to='products/', default="/products/default.jpg")

    def __str__(self):
        return str(self.productid)+'_'+str(self.name)
    
