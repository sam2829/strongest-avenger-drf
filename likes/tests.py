from django.contrib.auth.models import User
from .models import Like
from rest_framework import status
from rest_framework.test import APITestCase
from posts.models import Posts


class LikeListViewTests(APITestCase):
    """
    this class is for testing the LikeList views
    """
    # setup logged in user
    def setUp(self):
        sam = User.objects.create_user(username='sam', password='pass')
        emma = User.objects.create_user(username='emma', password='pass')
        self.post = Posts.objects.create(
            owner=sam,
            title='test title'
        )

    # test list of likes are displayed
    def test_can_list_likes(self):
        sam = User.objects.get(username='sam')
        emma = User.objects.get(username='emma')
        Like.objects.create(owner=sam, post=self.post)
        response = self.client.get('/likes/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    # test logged in user can like a post
    def test_logged_in_user_can_create_a_like(self):
        self.client.login(username='sam', password='pass')
        sam = User.objects.get(username='sam')
        response = self.client.post(
            '/likes/',
            {
                'post': self.post.id
            }
        )
        count = Like.objects.count()
        self.assertEqual(count, 1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    # test a logged out user cannot follow another user
    def test_logged_out_user_cannot_create_a_like(self):
        sam = User.objects.get(username='sam')
        response = self.client.post(
            '/likes/',
            {
                'post': self.post.id
            }
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class LikeDetailViewTests(APITestCase):
    """
    this class is for testing the LikeDetail views
    """
    # setup logged in user
    def setUp(self):
        sam = User.objects.create_user(username='sam', password='pass')
        emma = User.objects.create_user(username='emma', password='pass')
        self.post = Posts.objects.create(
            owner=sam,
            title='test title'
        )
        like_1 = Like.objects.create(owner=sam, post=self.post)
        like_2 = Like.objects.create(owner=emma, post=self.post)

    # test that user can retrieve single like by id
    def test_can_retrieve_like_detail(self):
        sam = User.objects.get(username='sam')
        response = self.client.get(f'/likes/1/')
        self.assertEqual(response.data['post'], self.post.id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # test user cannot retrieve a like with invalid id
    def test_cannot_retrieve_like_detail_using_invalid_id(self):
        sam = User.objects.get(username='sam')
        response = self.client.get(f'/likes/23/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    # test that user can delete a like
    def test_logged_in_user_can_delete_like(self):
        self.client.login(username='sam', password='pass')
        response = self.client.delete(f'/likes/1/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    # test that user cannot delete someone elses like
    def test_unauthorized_user_cannot_delete_like(self):
        self.client.login(username='sam', password='pass')
        response = self.client.delete(f'/likes/2/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    # test that user cannot delete a like logged out
    def test_logged_out_user_cannot_delete_like(self):
        response = self.client.delete(f'/likes/2/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


    

