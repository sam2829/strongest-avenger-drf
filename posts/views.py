from rest_framework import generics, permissions
from strongest_avenger_drf_api.permissions import IsOwnerOrReadOnly
from .models import Posts
from .serializers import PostsSerializer


class PostList(generics.ListCreateAPIView):
    """
    This class is to list all posts
    """
    serializer_class = PostsSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]
    queryset = Posts.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    This is class is to be able to get post by id,
    update post and delete post
    """
    serializer_class = PostsSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Posts.objects.all()

    