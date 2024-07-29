from django.urls import path
from .views import ProfileDetailJsonView

urlpatterns = [
    path('profile/view/', ProfileDetailJsonView.as_view(), name='profile-detail-json'),
]
