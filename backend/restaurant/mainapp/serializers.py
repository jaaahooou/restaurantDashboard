from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Room, Table, DishCategory, Dish, Order, OrderDish

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ["id",'username','first_name','email']



class DishCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = DishCategory
        fields = ['id','title']


class DishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dish 
        fields = ['id','category','title', 'price','countInStock']


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'


class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = [
        'id', 
        'user',
        "table", 
        "paymentMethod",
        'shipping', 
        "isPaid", 
        "createdAt", 
        "isDone", 
        "isBrought",
        "tip"]

class OrderDishSerializer(serializers.ModelSerializer):
    class Meta:
        model= OrderDish
        fields= ['id','order', 'dish', 'qty']