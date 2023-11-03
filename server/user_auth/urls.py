from django.urls import path, include
from . import views


urlpatterns = [
    path('register/', views.UserRegister.as_view(), name='register'),
    path('login/', views.UserLogin.as_view(), name='login'), 
    path('logout/', views.UserLogout.as_view(), name='logout'),
    path('address/', views.UserAddressView.as_view(), name='address'),
    path('changepass/', views.ChangePassView.as_view(), name='changepass'),
    path('edit/', views.EditUserInfo.as_view(), name='edit'),
]