from django.contrib import admin
from .models import *
Room, Table, DishCategory, Dish, Order, OrderDish, ShippingAddress

admin.site.register(Room)
admin.site.register(Table)
admin.site.register(DishCategory)
admin.site.register(Dish)
admin.site.register(Order)
admin.site.register(OrderDish)
admin.site.register(ShippingAddress)



