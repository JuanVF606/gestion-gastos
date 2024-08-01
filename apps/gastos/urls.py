from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoriaViewSet, PresupuestoViewSet, DetalleGastoViewSet, PresupuestoPorMesViewSet

# Crea un router y registra tus ViewSets
router = DefaultRouter()
router.register(r'categorias', CategoriaViewSet, basename='categoria')
router.register(r'presupuestos', PresupuestoViewSet, basename='presupuesto')
router.register(r'detalle_gastos', DetalleGastoViewSet, basename='detalle_gasto')
router.register(r'presupuesto-mensual', PresupuestoPorMesViewSet, basename='presupuesto-mensual')

urlpatterns = [
    path('', include(router.urls)),
]
