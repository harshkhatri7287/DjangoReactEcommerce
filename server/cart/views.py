from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import CartSerializer
from .models import Cart
from django.contrib.auth.models import User
from products.models import Product


class CartView(APIView):
    
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        data = request.data
 
        serializer = CartSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({'cartid': serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        userid = request.query_params.get('userid')

        try:
            cart_items = Cart.objects.filter(user=userid)
            cart_data = []
            for cart_item in cart_items:
                cart_data.append({
                    'productid': cart_item.product.productid,
                    'name': cart_item.product.name,
                    'price': cart_item.product.price,
                    'quantity': cart_item.quantity,
                    'cartid': cart_item.cartid,
                })
            return Response({'cart': cart_data}, status=status.HTTP_200_OK)
        except Cart.DoesNotExist:
            return Response({'error': 'Cart item not found.'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request):
        cartid = request.query_params.get('cartid')
        quantity = request.query_params.get('quantity')
        
        try:
            cart_instance = Cart.objects.get(cartid=cartid)
        except Cart.DoesNotExist:
            return Response({'error': 'Cart not found.'}, status=status.HTTP_404_NOT_FOUND)

        cart_instance.quantity = quantity
        cart_instance.save()

        return Response({'message': 'Cart quantity updated successfully.'}, status=status.HTTP_200_OK)

    def delete(self, request):
        cartid = request.query_params.get('cartid') 

        try:
            cart_item = Cart.objects.get(cartid=cartid)
            cart_item.delete()
            return Response({'message': 'Cart item deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)
        except Cart.DoesNotExist:
            return Response({'error': 'Cart item not found.'}, status=status.HTTP_404_NOT_FOUND)


class AllCartView(APIView):
    
    permission_classes = (permissions.AllowAny,)

    def delete(self, request):
        userid = request.query_params.get('userid')

        try:
            cart_items = Cart.objects.filter(user=userid)
            cart_items.delete() 
            return Response({'message': 'All cart items for the user deleted successfully.'}, status=status.HTTP_200_OK)
        except Cart.DoesNotExist:
            return Response({'error': 'Cart items not found for the user.'}, status=status.HTTP_404_NOT_FOUND)
