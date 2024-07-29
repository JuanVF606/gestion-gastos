from rest_framework import viewsets
from .models import Categoria, Presupuesto, DetalleGasto
from .serializers import CategoriaSerializer, PresupuestoSerializer, DetalleGastoSerializer

class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

class PresupuestoViewSet(viewsets.ModelViewSet):
    queryset = Presupuesto.objects.all()
    serializer_class = PresupuestoSerializer

class DetalleGastoViewSet(viewsets.ModelViewSet):
    queryset = DetalleGasto.objects.all()
    serializer_class = DetalleGastoSerializer
