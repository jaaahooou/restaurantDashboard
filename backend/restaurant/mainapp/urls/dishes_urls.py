from django.urls import path 
from mainapp.views import dishes_views as views


urlpatterns = [
    path('get-categories', views.getDishCategories, name='get-categories'),
    path('create-category', views.createDishCategory, name='create-category'),
    path('add-dish', views.addDishToMenu, name='add-dish'),
    path('get-dishes', views.getAllDishes, name='get-dishes'),
    
    path('remove-dish/<str:pk>', views.deleteDishFromMenu, name='remove-dish'),
    path('delete-category/<str:pk>', views.deleteDishCategory, name='delete-category')
]