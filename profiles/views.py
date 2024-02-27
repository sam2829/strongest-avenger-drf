from rest_framework import generics, permissions
from strongest_avenger_drf_api.permissions import IsOwnerOrReadOnly
from .models import Profile
from .serializers import ProfileSerializer



class ProfileList(generics.ListAPIView):
    """
    This class is to render the list of all profiles
    """
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    

class ProfileDetail(generics.RetrieveUpdateAPIView):
    """
    This class is to be able to get profile by id, or
    update profile.
    """
    serializer_class = ProfileSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Profile.objects.all()
