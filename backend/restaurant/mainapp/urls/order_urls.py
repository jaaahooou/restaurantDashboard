from django.urls import path 
from mainapp.views import order_views as views


urlpatterns = [
    path('get-orders',views.getOrders, name="get-orders" ),
    path('get-rooms', views.getAllRooms, name="get-rooms"),
    path('get-tables', views.getAllTables, name="get-tables"),
    
    path('add-dish-to-order/<str:pk>',views.addDishToOrder, name="add-dish-to-order" ),
    path('create-order/<str:pk>',views.createOrder, name='create-order'),
    path('update-order/<str:pk>',views.updateOrder, name='update-order'),
    path('get-order/<str:pk>',views.getOrderById, name='get-order'),
    path('update-qty/<str:pk>',views.changeDishQty, name='update-qty'),
   


]