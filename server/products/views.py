from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Product
from .serializers import ProductSerializer
from django.contrib.auth.models import User
from django.db.models import Q

class ProductView(APIView):

    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        data = request.data
        userid = data.get('userid')
        try:
            user = User.objects.get(id=userid)
        except User.DoesNotExist:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
        if user.is_superuser: 
            serializer = ProductSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response("You do not have permission to add products.", status=status.HTTP_403_FORBIDDEN)

    def put(self, request):
        data = request.data
        productid = data.get('productid')
        try:
            product = Product.objects.get(productid=productid)
        except Product.DoesNotExist:
            return Response({'message': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        productid = int(request.query_params.get('productid'))
        try:
            product = Product.objects.get(productid=productid)
        except Product.DoesNotExist:
            return Response({'message': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

        product.delete()
        return Response({'message': 'Product deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

class ProductSearch(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        search_term = request.query_params.get('searched', '')

        products = Product.objects.filter(
            Q(category__icontains=search_term) |
            Q(sub_category__icontains=search_term) |
            Q(brand__icontains=search_term)
        )

        serializer = ProductSerializer(products, many=True)

        return Response(serializer.data)