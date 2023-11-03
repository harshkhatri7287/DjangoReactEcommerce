# Generated by Django 4.2.5 on 2023-10-16 09:49

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_auth', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='phone',
            field=models.CharField(default='9999999999', max_length=10, validators=[django.core.validators.RegexValidator(message='Phone number must be a 10-digit number without dashes or spaces.', regex='^\\d{10}$')]),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='pincode',
            field=models.CharField(default='000000', max_length=6, validators=[django.core.validators.RegexValidator(message='Pincode must be a 6-digit number.', regex='^\\d{6}$')]),
        ),
    ]