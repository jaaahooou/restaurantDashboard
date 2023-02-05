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