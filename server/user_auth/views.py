from django.contrib.auth import get_user_model, login, logout
from rest_framework import status, permissions
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserLoginSerializer, UserRegisterSerializer, UserInfoSerializer
from django.http import HttpResponse
from django.middleware.csrf import get_token
from django.contrib.auth.models import User
from .models import UserAddress
from django.shortcuts import get_object_or_404
from .serializers import UserAddressSerializer
from django.contrib.auth.hashers import make_password


class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        data = request.data
        serializer = UserRegisterSerializer(data=data)
        if serializer.is_valid(raise_exception = True):
            user = serializer.create(data)
            if user:
                return Response(serializer.data , status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        data = request.data
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data=data)
            login(request, user)
            user_data = {"username": user.username,"first_name": user.first_name,"last_name": user.last_name,
            "id" : user.id,"superuser" : user.is_superuser,}
            response = Response({'user': user_data}, status=status.HTTP_201_CREATED)

            return response

        return Response(status=status.HTTP_400_BAD_REQUEST)

class UserLogout(APIView):
    def post(self, request):
        user_id = request.data.get('user_id')  # Assuming you send the user ID in the request data
        try:
            user = User.objects.get(id=user_id)
            if user.is_authenticated:
                logout(user)
                return Response({'message': 'User logged out successfully'}, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'User is not logged in'}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

class EditUserInfo(APIView):

    permission_classes = (permissions.AllowAny,)

    def put(self, request):
        data = request.data
        user = User.objects.get(id = data.get('id'))
        serializer = UserInfoSerializer(user, data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'message': 'Edited data successfully'}, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)




class UserAddressView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        serializer = UserAddressSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User profile created successfully.', 'profileid': serializer.data['profileid']}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        userid = request.query_params.get('userid')
        try:
            user_instance = User.objects.get(id=userid)
        except User.DoesNotExist:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

        addresses = UserAddress.objects.filter(user=user_instance)
        serializer = UserAddressSerializer(addresses, many=True)
        return Response({'addresses': serializer.data}, status=status.HTTP_200_OK)

    def put(self, request):
        data = request.data
        profileid = data['profileid']
        userAddress = get_object_or_404(UserAddress, profileid=profileid)
        serializer = UserAddressSerializer(userAddress, data=data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User profile updated successfully.'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        profileid = request.query_params.get('profileid')
        userAddress = get_object_or_404(UserAddress, profileid=profileid)
        userAddress.delete()
        return Response({'message': 'User profile deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)



# Change Password View

class ChangePassView(APIView):

    permission_classes = (permissions.AllowAny,)

    def put(self, request):
        data = request.data
        email = data.get('email')
        newpass = data.get('newpass')
        try:
            user_instance = User.objects.get(username=email)
        except User.DoesNotExist:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

        try:
            user_instance.set_password(newpass)
            user_instance.save()
            return Response({'message':'Password Changeed Successfully!!'}, status=status.HTTP_200_OK)
        except :
            return Response({'message':'Password not Changeed Successfully!!'}, status=status.HTTP_400_BAD_REQUEST)
