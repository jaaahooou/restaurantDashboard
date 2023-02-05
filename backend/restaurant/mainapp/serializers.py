from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Room, Table, DishCategory, Dish, Order, OrderDish, ShippingAddress

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ['id', 'username','first_name','email']



class DishCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = DishCategory
        fields = ['id','title']


class DishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dish 
        fields = ['category','title', 'price','countInStock']


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'


class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = '__all__'