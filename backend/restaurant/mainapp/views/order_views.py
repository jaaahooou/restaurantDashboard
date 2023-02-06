from rest_framework import permissions
from mainapp.models import Room, Table, DishCategory, Dish, Order, OrderDish
from mainapp.serializers import User,UserSerializer, RoomSerializer, TableSerializer, OrderSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addDishToOrder(request):
    data=request.data 
    user = request.user
    print(user)

    orderedDish = data['orderedDish']

    order = Order.objects.create(
        user=user,
        paymentMethod =data['paymenMethod'],
        totalPrice = data['totalPrice']

    )



    return Response('Hej ho')



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrders(response):
    orders = Order.objects.all()
    print(str(orders[0].table.room))
    serializer= OrderSerializer(orders, many=True)
    return Response(serializer.data)


