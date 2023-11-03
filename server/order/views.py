from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from products.models import Product
from .models import OrderData
from user_auth.models import UserAddress
from cart.models import Cart
from django.utils import timezone
from django.db import transaction

class OrderView(APIView):
    
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        data = request.data
        
        user_id = data['userid']
        profile_id = data['profileid']
        try:
            user_instance = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

        try:
            address_instance = UserAddress.objects.get(profileid=profile_id)
        except UserAddress.DoesNotExist:
            return Response({'error': 'Address not found.'}, status=status.HTTP_404_NOT_FOUND)
        
        current_date = timezone.now().date()

        # Initialize product quantities dictionary
        product_quantities = {}

        # Use a transaction to ensure data consistency
        with transaction.atomic():
            order = OrderData.objects.create(user=user_instance, address=address_instance, order_date=current_date)
            
            cart_items = Cart.objects.filter(user=user_id)
            for cart_item in cart_items:
                order.products.add(cart_item.product)
                product_quantities[cart_item.product.productid] = cart_item.quantity
                cart_item.delete()
            
            # Set the product quantities in the order
            order.products_quantities = product_quantities
            order.save()

        return Response({'orderid': order.orderid}, status=status.HTTP_201_CREATED)

    def get(self, request):
        userid = request.query_params.get('userid')
        try:
            user_instance = User.objects.get(id=userid)
        except User.DoesNotExist:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

        try:
            orders = OrderData.objects.filter(user=user_instance)
            order_data = []
            for order in orders:
                products_data = []
                for product in order.products.all():
                    # Retrieve the quantity of the product in this order
                    product_quantity = order.products_quantities.get(str(product.productid))
                    products_data.append({
                        'productid': product.productid,
                        'name': product.name,
                        'price': product.price,
                        'quantity': product_quantity,  # Include the quantity
                    })

                user_address = UserAddress.objects.get(profileid=order.address.profileid)
                user_address_data = {
                    'phone': user_address.phone,
                    'pincode': user_address.pincode,
                    'street': user_address.street,
                    'city': user_address.city,
                    'state': user_address.state,
                }

                order_data.append({
                    'orderid': order.orderid,
                    'order_date': order.order_date,
                    'products': products_data,
                    'user_address': user_address_data,
                    
                })

            return Response({'orders': order_data}, status=status.HTTP_200_OK)
        except Order.DoesNotExist:
            return Response({'error': 'No orders found for this user.'}, status=status.HTTP_404_NOT_FOUND)



