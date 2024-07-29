from django.http import JsonResponse
from django.views.generic import View
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import get_object_or_404
from .models import Profile

class ProfileDetailJsonView(LoginRequiredMixin, View):
    def get(self, request, *args, **kwargs):
        # Obtener el perfil del usuario autenticado
        profile = get_object_or_404(Profile, user=request.user)
        
        # Crear un diccionario con la información del perfil
        profile_data = {
            'email': profile.user.email,
            'first_name': profile.user.first_name,
            'last_name': profile.user.last_name,
            'age': profile.age,
            'profession': profile.profession,
            'salary': profile.salary,
            'work': profile.work,
            'phone': profile.phone
        }
        
        # Devolver la respuesta en formato JSON
        return JsonResponse(profile_data)

