from rest_framework import permissions
from .models import Room, Table, DishCategory, Dish, Order, OrderDish, ShippingAddress
from .serializers import User,UserSerializer, RoomSerializer, TableSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    
    def validate(self, attrs):
        data = super().validate(attrs)
        data['username'] = self.user.username
        data['email'] = self.user.email
        

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# Add dish category (only admin) 
@api_view(['POST'])
@permission_classes([IsAdminUser])
def createDishCategory(request):
    try:
        data = request.data 
        dishCategory = DishCategory.objects.create(
            title = data['title']
        )
        serializer = DishCategorySerializer(dishCategory, many=False)
        return (serializer.data)
    except:
        message = {"Error" : "This category already exist"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)




@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
   
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createUser(request):

    try:
        data = request.data 
        user = User.objects.create(
            first_name = data['name'],
            username = data['email'],
            email=data['email'],
            password = make_password(data['password']),
        )

        serializer = UserSerializer(user, many=False)
        return Response(serializer.data)
    except:
        message= {"Error": "User with this email already exist"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getUserById(request,pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)




# Remove dish category (only admin)

# Add new dish to menu (only admin)
# Delete a dish from menu (only admin)

# Add dish to order (authenticated)
# Add order (authenticated)

# Add Rooms (Admin only)
# Add Tables (Admin only)

# Add Shipping Addres (auth)

# Get Orders (auth)
# Get dishes (auth)


