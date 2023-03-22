from rest_framework import permissions
from mainapp.models import Room, Table, DishCategory, Dish, Order, OrderDish,Employee
from mainapp.serializers import User,UserSerializer, UserSerializerWithToken,EmployeeSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        
        return token
    
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data
        for k,v in serializer.items():
            data[k]=v
        
        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getUserProfile(request):
    user= request.user
    print(user)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getUsers(request):
    
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
   
    return Response(serializer.data)


@api_view(['GET'])
def get_employees(request):

    employees = Employee.objects.all()
    serializer = EmployeeSerializer(employees, many=True)

    return Response(serializer.data)


@api_view(['POST'])
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




@api_view(['DELETE'])
def deleteUser(request,pk):
    userToDelete = User.objects.get(id=pk)
    if userToDelete.is_superuser:
        return Response("Cannot remove Admin user")
    print(userToDelete.is_superuser)
    userToDelete.delete()
    return Response('User removed from system')