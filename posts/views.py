from django.http import Http404
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Posts
from .serializers import PostsSerializer
from strongest_avenger_drf_api.permissions import IsOwnerOrReadOnly



class PostList(APIView):
    """
    This class is to list all posts
    """
    serializer_class = PostsSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]

    # Get all posts
    def get(self, request):
        posts = Posts.objects.all()
        serializer = PostsSerializer(
            posts, many=True, context={'request': request}
        )
        return Response(serializer.data)

    # create post
    def post (self, request):
        serializer = PostsSerializer(
            data=request.data, context={'request': request}
        )
        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(
                serializer.data, status=status.HTTP_201_CREATED
            )
        return Response(
            serializer.errors, status=status.HTTP_400_BAD_REQUEST
        )


class PostDetail(APIView):
    """
    This is class is to be able to get post by id,
    update post and delete post
    """
    serializer_class = PostsSerializer
    permission_classes = [IsOwnerOrReadOnly]

    # check if object exists
    def get_object(self, pk):
        try:
            post = Posts.objects.get(pk=pk)
            self.check_object_permissions(self.request, post)
            return post
        except Posts.DoesNotExist:
            raise Http404

    # get post by id
    def get(self, request, pk):
        post = self.get_object(pk)
        serializer = PostsSerializer(
            post, context={'request': request}
        )
        return Response(serializer.data)

    # edit post
    def put(self, request, pk):
        post = self.get_object(pk)
        serializer = PostsSerializer(
            post, data=request.data, context={'request': request}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(
            serializer.errors, status=status.HTTP_400_BAD_REQUEST
        )

    # delete post
    def delete(self, request, pk):
        post = self.get_object(pk)
        post.delete()
        return Response(
            status=status.HTTP_204_NO_CONTENT
        )