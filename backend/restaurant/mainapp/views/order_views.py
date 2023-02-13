from rest_framework import permissions
from mainapp.models import Room, Table, DishCategory, Dish, Order, OrderDish
from mainapp.serializers import User,UserSerializer, RoomSerializer, TableSerializer, OrderSerializer,OrderDishSerializer 
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


#create order 
@api_view(['POST'])
#@permission_classes([IsAuthenticated])
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

    #swicth table.isOccupied to True, no one else can make an order assigned this table
    table.isOccupied = True
    table.save()
   
    serializer = OrderSerializer(order, many=False)
    return Response(serializer.data)
    

#update order only for assigned user
@api_view(['GET'])
def getOrderById(request,pk):
    order = Order.objects.get(id=pk)
    serializer= OrderSerializer(order, many=False)
    return Response(serializer.data)



#update order only for assigned user
@api_view(['POST'])
#@permission_classes([IsAuthenticated])
def updateOrder(request,pk):
    data= request.data
    order = Order.objects.get(id=pk)
    user = request.user
    table = order.table

    if user == order.user:
       
        table.isOccupied = data['isOccupied']
        table.save()
        order.isPaid = data['isPaid']
        order.save()
        
        return Response("Order updated")

    return Response("You have no permission to do that!")



# add dish to order

@api_view(['POST'])
#@permission_classes([IsAuthenticated])
def addDishToOrder(request,pk):
    data=request.data 
    user = request.user
   
    table = data['table_id']
    qty = data['qty']
    dishToAdd = Dish.objects.get(id=pk)
    order = Order.objects.get(table=table)
    print(order.user)
    if user == order.user:
   
        dishToOrder = OrderDish.objects.create(
            dish=dishToAdd,
            order = order,
            qty=qty
        )
        serializer = OrderDishSerializer(dishToOrder, many=False)
        return Response(serializer.data)
    return Response("You have no permission to do that!")


#remove dish from order

@api_view(['DELETE'])
#@permission_classes([IsAuthenticated])
def removeDishFromOrder(request,pk):
    dishToRemove = OrderDish.objects.get(id=pk)
    dishToRemove.delete()
    return Response("Dish removed from order")


# get All orders 

@api_view(['GET'])
#@permission_classes([IsAuthenticated])
def getOrders(request):
    orders = Order.objects.all()
 
    serializer= OrderSerializer(orders, many=True)
    return Response(serializer.data)


#get all Rooms

@api_view(['GET'])
def getAllRooms(request):
    rooms = Room.objects.all()
    serializer = RoomSerializer(rooms, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getAllTables(request):
    tables = Table.objects.all()
    serializer = TableSerializer(tables, many=True)
    return Response(serializer.data)
    