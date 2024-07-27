from django.db import models
from apps.category.models import Category
from django.conf import settings
User = settings.AUTH_USER_MODEL
# Create your models here.

class Gasto(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField( blank=True, null=True)
    tipo_gasto = models.ForeignKey(Category, on_delete=models.PROTECT, blank=True, null=True)
    monto = models.DecimalField(max_digits=8, decimal_places= 2)# CLP 
    fecha = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.nombre
      
      