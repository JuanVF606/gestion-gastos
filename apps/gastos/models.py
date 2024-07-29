from django.db import models
from django.utils import timezone
from django.conf import settings

class Categoria(models.Model):
    nombre = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.nombre

class Presupuesto(models.Model):
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    monto_total = models.DecimalField(max_digits=10, decimal_places=2)
    fecha_inicio = models.DateField(default=timezone.now)
    fecha_fin = models.DateField(default=timezone.now)
    descripcion = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Presupuesto - : {self.monto_total} desde {self.fecha_inicio}"

class DetalleGasto(models.Model):
    TIPO_GASTO_CHOICES = [
        ('fijo', 'Fijo'),
        ('fantasma', 'Fantasma'),
    ]

    presupuesto = models.ForeignKey(Presupuesto, related_name='detalles', on_delete=models.CASCADE)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    tipo_gasto = models.CharField(max_length=100, choices=TIPO_GASTO_CHOICES, blank=True, null=True)
    descripcion = models.CharField(max_length=255)
    monto = models.DecimalField(max_digits=10, decimal_places=2)
    fecha = models.DateField(default=timezone.now)
    tiene_fecha_limite = models.BooleanField(default=False)
    fecha_limite = models.DateField(null=True, blank=True)
    def __str__(self):
        return f"{self.descripcion}: {self.monto} en {self.fecha}"
