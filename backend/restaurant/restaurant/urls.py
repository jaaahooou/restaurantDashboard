from django.contrib import admin
from django.urls import path, include
from mainapp.urls import user_urls
from mainapp.urls import dishes_urls
from mainapp.urls import order_urls


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('user/', include(user_urls)),
    path('dishes/', include(dishes_urls)),
    path('orders/', include(order_urls)),
]