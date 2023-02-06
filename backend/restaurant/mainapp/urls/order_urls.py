from django.urls import path 
from mainapp.views import order_views as views


urlpatterns = [
    path('get-orders',views.getOrders, name="get-orders" ),
    path('add-dish-to-order',views.addDishToOrder, name="add-dish-to-order" ),
    #g
]