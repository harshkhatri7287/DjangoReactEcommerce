from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from rest_framework.exceptions import ValidationError
from .models import UserAddress

UserModel = get_user_model()


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ['email', 'password', 'first_name', 'last_name',]
    
    def create(self, validated_data):
        user_obj = UserModel.objects.create_user(username=validated_data['email'], 
        password=validated_data['password'],first_name=validated_data['first_name'], 
            last_name=validated_data['last_name'], )
        return user_obj


class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ['email', 'password']
    def check_user(self, data):

        user = authenticate(username=data['email'], password=data['password'])

        if not user:
            raise ValidationError('User not found or invalid credentials.')

        return user

class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ['username', 'first_name', 'last_name']

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = UserModel
#         fields = ['username', 'first_name']


# User Address Serializer

class UserAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAddress
        fields = '__all__'