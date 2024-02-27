from rest_framework import generics, permissions
from strongest_avenger_drf_api.permissions import IsOwnerOrReadOnly
from .models import Follow
from .serializers import FollowSerializer


class FollowList(generics.ListCreateAPIView):
    """
    this class is to list follows
    """
    serializer_class = FollowSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Follow.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class FollowDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    this class is to be able to retirve follow by id,
    update and delete follow
    """
    serializer_class = FollowSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Follow.objects.all()
