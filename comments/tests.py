from django.contrib.auth.models import User
from .models import Comment
from posts.models import Posts
from rest_framework import status
from rest_framework.test import APITestCase


class CommentListViewTests(APITestCase):
    """
    this class is for testing the CommentList views
    """
    # setup logged in user
    def setUp(self):
        sam = User.objects.create_user(username='sam', password='pass')
        self.post = Posts.objects.create(
            owner=sam,
            title='test title'
        )

    # test list of comments are displayed
    def test_can_list_comments(self):
        sam = User.objects.get(username='sam')
        Comment.objects.create(
            owner=sam,
            post=self.post,
            content='test content'
        )
        response = self.client.get('/comments/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # test logged in user can create a comment
    def test_logged_in_user_can_create_comment(self):
        self.client.login(username='sam', password='pass')
        response = self.client.post(
            '/comments/',
            {
                'post': self.post.id,
                'content': 'test content',
            }
        )
        count = Comment.objects.count()
        self.assertEqual(count, 1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    # test a logged out user cannot create a comment
    def test_logged_out_user_cannot_create_comment(self):
        response = self.client.post(
            '/comments/',
            {
                'post': self.post.id,
                'content': 'test content',
            }
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)