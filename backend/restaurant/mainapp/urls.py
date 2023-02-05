from django.urls import path 
from rest_framework_simplejwt.views import (
    TokenObtainPairView
)
from .views import (
    getUsers,
    createUser,
    getUserById,
    MyTokenObtainPairView
)


urlpatterns=[
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/', getUsers, name='users'),
    path('users/<str:pk>/', getUserById, name='user'),
    path('create/', createUser, name='create'),
]