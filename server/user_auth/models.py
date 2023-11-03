from django.contrib.auth.models import User
from django.db import models
from django.core.validators import RegexValidator

phone_regex = RegexValidator(
    regex=r'^\d{10}$',
)
pincode_regex = RegexValidator(
    regex=r'^\d{6}$',
)

class UserAddress(models.Model):
    profileid = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, to_field='id')
    phone = models.CharField(
        max_length=10,
        validators=[phone_regex], 
        default=''
    )
    pincode = models.CharField(
        max_length=6,
        validators=[pincode_regex],
        default=''
    )
    street = models.CharField(max_length=100, default='')
    city = models.CharField(max_length=50, default='')
    state = models.CharField(max_length=50, default='')

    def __str__(self):
        return str(self.profileid)+'_'+str(self.user.first_name)



