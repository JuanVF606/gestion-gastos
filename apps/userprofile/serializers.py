from rest_framework import serializers
from .models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['user', 'email', 'thumbnail', 'age', 'profession', 'salary', 'work', 'phone']
