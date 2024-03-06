from django.db.models import Count
from rest_framework import generics, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
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
    queryset = Posts.objects.annotate(
        comments_count=Count('comment', distinct=True),
        likes_count=Count('likes', distinct=True)
    ).order_by('-created_at')
    filter_backends = [
        filters.OrderingFilter,
        filters.SearchFilter,
        DjangoFilterBackend,
    ]
    filterset_fields = [
        'owner__followed__owner__profile',
        'likes__owner__profile',
        'owner__profile',
        'character_category',
    ]
    search_fields = [
        'owner__username',
        'title',
        'character_name',
        'character_category',
    ]
    ordering_fields = [
        'comments_count',
        'likes_count',
        'likes__created_at',
    ]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    This is class is to be able to get post by id,
    update post and delete post
    """
    serializer_class = PostsSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Posts.objects.annotate(
        comments_count=Count('comment', distinct=True),
        likes_count=Count('likes', distinct=True)
    ).order_by('-created_at')
