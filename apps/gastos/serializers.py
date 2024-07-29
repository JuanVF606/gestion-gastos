from rest_framework import serializers
from .models import Gasto

class GastoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gasto
        fields = ['id', 'nombre', 'descripcion', 'tipo_gasto', 'monto', 'fecha']
