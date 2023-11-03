from django.urls import path
from .views import CartView, AllCartView

urlpatterns = [
    path('', CartView.as_view(), name='product_list'),
    path('deleteall/', AllCartView.as_view(), name='deleteall'),
]
