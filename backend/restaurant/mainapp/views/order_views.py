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
def createOrder(request,pk):
    data = request.data
    user = request.user
    # get table for order, each order is assigned to table
    table = Table.objects.get(id=pk)
    if table.isOccupied == False:
                  
        order = Order.objects.create(
            user = request.user,
            table = table
            
        )
        
    else:
        return Response('Table is occupied')
    print(user)
    #swicth table.isOccupied to True, no one else can make an order assigned this table
    table.isOccupied = True
    table.save()
    print(table.isOccupied)
    serializer = OrderSerializer(order, many=False)
    return Response(serializer.data)
    

#update order only for assigned user
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def updateOrder(request):
    pass


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addDishToOrder(request):
    data=request.data 
    user = request.user
    print(user)

    return Response('Hej ho')



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrders(request):
    orders = Order.objects.all()
    print(str(orders[0].table.room))
    serializer= OrderSerializer(orders, many=True)
    return Response(serializer.data)


