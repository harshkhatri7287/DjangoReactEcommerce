# Generated by Django 4.2.5 on 2023-11-01 08:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0016_product_brand'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='brand',
            field=models.CharField(default='karton', max_length=50),
        ),
        migrations.AlterField(
            model_name='product',
            name='sub_category',
            field=models.CharField(default='karton', max_length=50),
        ),
    ]