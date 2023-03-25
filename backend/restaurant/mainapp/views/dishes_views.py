
from mainapp.models import DishCategory, Dish, Order, OrderDish,Table
from mainapp.serializers import  DishCategorySerializer, DishSerializer,OrderDishSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser




# get all dishes from menu

@api_view(['GET'])
#@permission_classes([IsAuthenticated])
def getAllDishes(request):
    dishes = Dish.objects.all()
    serializer = DishSerializer(dishes, many=True)
    
    return Response(serializer.data)


# Add dish category (only admin) 
@api_view(['POST'])
#@permission_classes([IsAdminUser])
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
#@permission_classes([IsAuthenticated])
def getDishCategories(request):
    dishCategories = DishCategory.objects.all()
    serializer = DishCategorySerializer(dishCategories, many=True)
    return Response(serializer.data)

# Delete dish category (only admin) 
@api_view(['DELETE'])
#@permission_classes([IsAdminUser])
def deleteDishCategory(request,pk):
    categoryToRemove = DishCategory.objects.get(id=pk)
    categoryToRemove.delete()
    return Response("Category removed")



# Add dish To menu (only admin)
@api_view(['POST'])
#@permission_classes([IsAdminUser])
def addDishToMenu(request):
    data = request.data
    print(data)
    dishTitle = data['body']['title']
    dishCategory = data['body']['category']
    dishPrice = data['body']['price']
   #check if dish category exist
    if DishCategory.objects.filter(title=str(dishCategory)).count()<=0:
        return Response("Category doesn`t exist")
        #check if dish exist
    elif DishCategory.objects.filter(title=str(dishCategory)).count()>0:
        if Dish.objects.filter(title=str(dishTitle)).count()>0:
            return Response("This dish already exist")
    
        DishCategory.objects.get(title=dishCategory)
        dishToAdd = Dish.objects.create(
            category = DishCategory.objects.get(title=dishCategory),
            title = dishTitle,
            price = dishPrice,
            countInStock = 100
        )
        serializer = DishSerializer(dishToAdd, many=False)
        return Response(serializer.data)

# delete dish from menu



# get ordered dishes
@api_view(['GET'])
#@permission_classes([IsAuthenticated])
def getOrderDish(request):
    orderDishes = OrderDish.objects.all()
   
    serializer = OrderDishSerializer(orderDishes, many=True)
    return Response(serializer.data)

#get ordered dish by id

@api_view(['GET'])
def getOrderedDishById(request,pk):
    orderedDish = OrderDish.objects.get(id=pk)
    dishes = Dish.objects.all()
    dishPrice = orderedDish.dish.price
    
    
    serializer = OrderDishSerializer(orderedDish, many=False)
    return Response({
        "orderedDishData" : serializer.data,
        "orderedDishPrice" : dishPrice,
        })


@api_view(['DELETE'])
def deleteDish(request,pk):
    dishToDelete = Dish.objects.get(id=pk)
    dishToDelete.delete()
    return Response("Dish removed")


        


   