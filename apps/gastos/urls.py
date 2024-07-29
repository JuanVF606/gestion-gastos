from django.urls import path
from .views import *

urlpatterns = [
    path('gastos/', GastoListAPIView, name='gasto-list-create'),
    path('gastos/<int:pk>/', GastoDetailAPIView, name='gasto-retrieve-update-destroy'),
]
