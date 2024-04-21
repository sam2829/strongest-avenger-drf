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
        self.client.login(username='sam', password='pass')
        Comment.objects.create(
            owner=sam,
            post=self.post,
            content='test content'
        )
        response = self.client.get('/api/comments/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # test logged in user can create a comment
    def test_logged_in_user_can_create_comment(self):
        self.client.login(username='sam', password='pass')
        response = self.client.post(
            '/api/comments/',
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
            '/api/comments/',
            {
                'post': self.post.id,
                'content': 'test content',
            }
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class CommentDetailViewTests(APITestCase):
    """
    this class is for testing the Comment Detail views
    """
    # setup logged in users
    def setUp(self):
        sam = User.objects.create_user(username='sam', password='pass')
        emma = User.objects.create_user(username='emma', password='pass')
        post_1 = Posts.objects.create(
            owner=sam,
            title='test title',
            content='sam content'
        )
        post_2 = Posts.objects.create(
            owner=emma,
            title='another title',
            content='emma content'
        )
        comment_1 = Comment.objects.create(
            owner=sam,
            post=post_1,
            content='Test Comment by Sam'
        )
        comment_2 = Comment.objects.create(
            owner=emma,
            post=post_2,
            content='Test Comment by Emma'
        )

    # test that user can retrieve single comment by id
    def test_can_retrieve_comment_detail(self):
        response = self.client.get(f'/api/comments/1/')
        self.assertEqual(response.data['content'], 'Test Comment by Sam')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # test user cannot retrieve a comment with invalid id
    def test_cannot_retrieve_comment_detail_using_invalid_id(self):
        response = self.client.get(f'/api/comments/23/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    # test that user can update a comment
    def test_logged_in_user_can_update_comment(self):
        self.client.login(username='sam', password='pass')
        response = self.client.put(
            '/api/comments/1/',
            {
                'content': 'update content',
            }
        )
        comment = Comment.objects.filter(pk=1).first()
        self.assertEqual(comment.content, 'update content')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # test that user cannot updated someone elses comment
    def test_logged_in_user_cannot_update_anothers_comment(self):
        self.client.login(username='sam', password='pass')
        response = self.client.put(
            '/api/comments/2/',
            {
                'content': 'update content',
            }
        )
        comment = Comment.objects.filter(pk=2).first()
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    # test that user cannot update comment logged out
    def test_logged_out_user_cannot_update_comment(self):
        response = self.client.put(
            f'/api/comments/1/',
            {
                'content': 'update content',
            }
        )
        comment = Comment.objects.filter(pk=1).first()
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    # test that user can delete a comment
    def test_logged_in_user_can_delete_comment(self):
        self.client.login(username='sam', password='pass')
        response = self.client.delete(f'/api/posts/1/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    # test that user cannot delete someone elses comment
    def test_unauthorized_user_cannot_delete_comment(self):
        self.client.login(username='sam', password='pass')
        response = self.client.delete(f'/api/posts/2/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    # test that user cannot delete a comment logged out
    def test_logged_out_user_cannot_delete_comment(self):
        response = self.client.delete(f'/api/posts/2/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    # test invalid data in comment is not accepted
    def test_invalid_post_comment(self):
        self.client.login(username='sam', password='pass')
        response = self.client.post(
            '/api/comments/',
            {
                'content': '',
            }
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('content', response.data)
