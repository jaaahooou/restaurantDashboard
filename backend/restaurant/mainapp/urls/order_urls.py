from django.urls import path 
from mainapp.views import order_views as views
from mainapp.views import dishes_views as dshviews


urlpatterns = [
    path('get-orders',views.getOrders, name="get-orders" ),
    path('get-rooms', views.getAllRooms, name="get-rooms"),
    path('get-tables', views.getAllTables, name="get-tables"),
    path('order/dishes/get-categories', dshviews.getDishCategories, name="get-categories-dsh"),
    path('create-new-table', views.createTable, name="create-new-table"),

    
    path('add-dish-to-order',views.addDishToOrder, name="add-dish-to-order" ),
    path('remove-dish-from-order/<str:pk>',views.removeDishFromOrder, name="remove-dish-from-order" ),
    path('create-order/<str:pk>',views.createOrder, name='create-order'),
    path('update-order/<str:pk>',views.updateOrder, name='update-order'),
    path('get-order/<str:pk>',views.getOrderById, name='get-order'),
    path('update-qty/<str:pk>',views.changeDishQty, name='update-qty'),
    path('remove-table/<str:pk>',views.removeTable, name='remove-table'),
    

   


]