from rest_framework import permissions
from mainapp.models import Room, Table, DishCategory, Dish, Order, OrderDish, ShippingAddress
from mainapp.serializers import User,UserSerializer, DishCategorySerializer, DishSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


# Add dish category (only admin) 
@api_view(['POST'])
@permission_classes([IsAdminUser])
def createDishCategory(request):
    
    data = request.data 
    categoryToAdd = data['title']
    
    
    if DishCategory.objects.filter(title=str(categoryToAdd)).count()>0:
        return Response("This category already exist")

    dishCategory = DishCategory.objects.create(
        title = data['title']
    )
    serializer = DishCategorySerializer(dishCategory, many=False)
    

    return Response(serializer.data)


# Get dish categories (auth) 
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getDishCategories(request):
    dishCategories = DishCategory.objects.all()
    serializer = DishCategorySerializer(dishCategories, many=True)
    return Response(serializer.data)

# Delete dish category (only admin) 
@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteDishCategory(request,pk):
    categoryToRemove = DishCategory.objects.get(id=pk)
    categoryToRemove.delete()
    return Response("Category removed")


@api_view(['POST'])
@permission_classes([IsAdminUser])
def addDishToMenu(request):
    data = request.data
    dishTitle = data['title']
    dishCategory = data['category']
   
    if DishCategory.objects.filter(title=str(dishCategory)).count()<=0:
        return Response("Category doesn`t exist")
    elif DishCategory.objects.filter(title=str(dishCategory)).count()>0:
        if Dish.objects.filter(title=str(dishTitle)).count()>0:
            return Response("This dish already exist")
    
        DishCategory.objects.get(title=dishCategory)
        dishToAdd = Dish.objects.create(
            category = DishCategory.objects.get(title=dishCategory),
            title = data['title'],
            price = data['price'],
            countInStock = data['countInStock']
        )
        serializer = DishSerializer(dishToAdd, many=False)
        return Response(serializer.data)

        
        






   