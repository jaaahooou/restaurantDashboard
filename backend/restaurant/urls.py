from django.contrib import admin
from django.urls import path, include
from mainapp.urls import user_urls
from mainapp.urls import dishes_urls
from mainapp.urls import order_urls
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name="index.html")),
    path('api-auth/', include('rest_framework.urls')),
    path('user/', include(user_urls)),
    path('dishes/', include(dishes_urls)),
    path('orders/', include(order_urls)),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)