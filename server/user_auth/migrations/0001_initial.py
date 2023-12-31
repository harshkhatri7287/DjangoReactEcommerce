# Generated by Django 4.2.5 on 2023-10-16 09:46

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('phone', models.CharField(max_length=10, validators=[django.core.validators.RegexValidator(message='Phone number must be a 10-digit number without dashes or spaces.', regex='^\\d{10}$')])),
                ('pincode', models.CharField(max_length=6, validators=[django.core.validators.RegexValidator(message='Pincode must be a 6-digit number.', regex='^\\d{6}$')])),
                ('street', models.CharField(default='', max_length=100)),
                ('city', models.CharField(default='', max_length=50)),
                ('state', models.CharField(default='', max_length=50)),
            ],
        ),
    ]
