from django.contrib import admin
from django.urls import path, include
from mainapp import urls as main_urls


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('user/', include(main_urls)),
]