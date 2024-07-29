from rest_framework import serializers
from .models import Categoria, Presupuesto, DetalleGasto

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['id', 'nombre', 'descripcion']

class DetalleGastoSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetalleGasto
        fields = ['id', 'presupuesto', 'tipo_gasto', 'descripcion', 'monto', 'fecha']

class PresupuestoSerializer(serializers.ModelSerializer):
    detalles = DetalleGastoSerializer(many=True, read_only=True)  # Incluir detalles relacionados
    categoria = CategoriaSerializer()  # Incluir datos de la categoría

    class Meta:
        model = Presupuesto
        fields = ['id', 'usuario', 'categoria', 'monto_total', 'fecha_inicio', 'fecha_fin', 'tipo', 'descripcion', 'detalles']
