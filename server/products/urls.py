from django.urls import path
from .views import ProductSearch, ProductView

urlpatterns = [
    # path('<str:category>', ProductList.as_view(), name='product_list'),
    path('search/', ProductSearch.as_view(), name='product_search'),
    path('', ProductView.as_view(), name='product'),
]
