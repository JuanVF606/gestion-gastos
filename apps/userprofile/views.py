from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Profile
from .serializers import ProfileSerializer
from django.shortcuts import get_object_or_404
class ProfileDetailJsonView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        # Obtener el perfil del usuario autenticado
        profile = get_object_or_404(Profile, user=request.user)
        
        # Serializar los datos del perfil
        serializer = ProfileSerializer(profile)
        
        # Devolver la respuesta en formato JSON
        return Response(serializer.data)
