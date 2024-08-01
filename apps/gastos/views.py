from rest_framework import viewsets
from .models import Categoria, Presupuesto, DetalleGasto
from .serializers import CategoriaSerializer, PresupuestoSerializer, DetalleGastoSerializer, PresupuestoPorMesSerializer
from rest_framework.response import Response


class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

class PresupuestoViewSet(viewsets.ModelViewSet):
    queryset = Presupuesto.objects.all()
    serializer_class = PresupuestoSerializer

class DetalleGastoViewSet(viewsets.ModelViewSet):
    queryset = DetalleGasto.objects.all()
    serializer_class = DetalleGastoSerializer

class PresupuestoPorMesViewSet(viewsets.ViewSet):
    def list(self, request):
        detalles = DetalleGasto.objects.all()
        
        presupuesto_mensual = {}
        for detalle in detalles:
            mes = detalle.fecha.strftime('%Y-%m')
            if mes not in presupuesto_mensual:
                presupuesto_mensual[mes] = {
                    'mes': mes,
                    'monto_total': 0,
                    'detalles': []
                }
            presupuesto_mensual[mes]['monto_total'] += detalle.monto
            presupuesto_mensual[mes]['detalles'].append({
                'categoria': detalle.categoria,
                'tipo_gasto': detalle.tipo_gasto,
                'descripcion': detalle.descripcion,
                'monto': float(detalle.monto),
                'fecha': detalle.fecha.strftime('%Y-%m-%d'),
                'tiene_fecha_limite': detalle.tiene_fecha_limite,
                'fecha_limite': detalle.fecha_limite.strftime('%Y-%m-%d') if detalle.fecha_limite else None
            })

        # Convert dictionary to list
        response_data = list(presupuesto_mensual.values())
        serializer = PresupuestoPorMesSerializer(response_data, many=True)
        return Response(serializer.data)