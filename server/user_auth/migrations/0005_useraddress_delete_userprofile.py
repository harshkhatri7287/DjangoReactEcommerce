# Generated by Django 4.2.5 on 2023-10-23 09:05

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('user_auth', '0004_alter_userprofile_phone_alter_userprofile_pincode'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserAddress',
            fields=[
                ('profileid', models.AutoField(primary_key=True, serialize=False)),
                ('phone', models.CharField(default='', max_length=10, validators=[django.core.validators.RegexValidator(regex='^\\d{10}$')])),
                ('pincode', models.CharField(default='', max_length=6, validators=[django.core.validators.RegexValidator(regex='^\\d{6}$')])),
                ('street', models.CharField(default='', max_length=100)),
                ('city', models.CharField(default='', max_length=50)),
                ('state', models.CharField(default='', max_length=50)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.DeleteModel(
            name='UserProfile',
        ),
    ]