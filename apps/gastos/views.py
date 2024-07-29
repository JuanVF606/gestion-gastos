# Create your views here.
from rest_framework import generics
from .models import Gasto
from .serializers import GastoSerializer
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
class GastoListAPIView(generics.ListCreateAPIView):
    queryset = Gasto.objects.all()
    serializer_class = GastoSerializer

@csrf_exempt
class GastoDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Gasto.objects.all()
    serializer_class = GastoSerializer
