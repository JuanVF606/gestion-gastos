from django.db import models
from django.conf import settings

UserAccount = settings.AUTH_USER_MODEL


class Profile(models.Model):
    user = models.OneToOneField(UserAccount, on_delete=models.CASCADE)
    age = models.IntegerField(null=True, blank=True)
    profession = models.CharField(max_length=255, null=True, blank=True)
    salary = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    work = models.CharField(max_length=255, null=True, blank=True)
    phone = models.CharField(max_length=15, null=True, blank=True)

    def __str__(self):
        return self.user.email  # Usa 'email' en lugar de 'username'
