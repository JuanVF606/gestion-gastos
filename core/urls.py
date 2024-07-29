from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.views.generic import TemplateView
from django.conf import settings

urlpatterns = [
    # Rutas de autenticación
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.social.urls')),

    # Rutas de API
    path('api/v1/gastos/', include('apps.gastos.urls')),
    path('api/v1/category/', include('apps.category.urls')),
    path('api/v1/userprofile/', include('apps.userprofile.urls')),

    # Ruta de administrador
    path('admin/', admin.site.urls),


    # Ruta para servir archivos de medios en desarrollo
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Ruta para capturar todas las demás rutas y dirigirlas a una plantilla HTML
urlpatterns += [
    path('', TemplateView.as_view(template_name='index.html')),
    path('<path:resource>', TemplateView.as_view(template_name='index.html')),
]
