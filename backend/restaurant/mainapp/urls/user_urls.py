from django.urls import path 
from rest_framework_simplejwt.views import (
    TokenObtainPairView
)
from mainapp.views import user_views as views



urlpatterns=[
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/', views.getUsers, name='users'),
    path('create/', views.createUser, name='create'),

    path('users/<str:pk>/', views.getUserById, name='user'),
    
]