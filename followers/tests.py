from django.contrib.auth.models import User
from .models import Follow
from rest_framework import status
from rest_framework.test import APITestCase


class FollowListViewTests(APITestCase):
    """
    this class is for testing the FollowList views
    """
    # setup logged in user
    def setUp(self):
        sam = User.objects.create_user(username='sam', password='pass')
        emma = User.objects.create_user(username='emma', password='pass')

    # test list of followers are displayed
    def test_can_list_followers(self):
        sam = User.objects.get(username='sam')
        emma = User.objects.get(username='emma')
        Follow.objects.create(owner=sam, followed=emma)
        response = self.client.get('/followers/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        count = Follow.objects.count()
        self.assertEqual(count, 1)

    # test logged in user can follow another user
    def test_logged_in_user_can_create_follower(self):
        self.client.login(username='sam', password='pass')
        emma = User.objects.get(username='emma')
        response = self.client.post(
            '/followers/',
            {
                'followed': emma.id
            }
        )
        count = Follow.objects.count()
        self.assertEqual(count, 1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    # test a logged out user cannot follow another user
    def test_logged_out_user_cannot_create_follower(self):
        emma = User.objects.get(username='emma')
        response = self.client.post(
            '/followers/',
            {
                'followed': emma.id
            }
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class FollowDetailViewTests(APITestCase):
    """
    this class is for testing the FollowDetail views
    """
    # setup logged in user
    def setUp(self):
        sam = User.objects.create_user(username='sam', password='pass')
        emma = User.objects.create_user(username='emma', password='pass')
        follower_1 = Follow.objects.create(owner=sam, followed=emma)
        follower_2 = Follow.objects.create(owner=emma, followed=sam)

    # test that user can retrieve single follower by id
    def test_can_retrieve_follower_detail(self):
        sam = User.objects.get(username='sam')
        emma = User.objects.get(username='emma')
        response = self.client.get(f'/followers/1/')
        self.assertEqual(response.data['owner'], sam.username)
        self.assertEqual(response.data['followed'], emma.id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # test user cannot retrieve a follower with invalid id
    def test_cannot_retrieve_follower_detail_using_invalid_id(self):
        sam = User.objects.get(username='sam')
        emma = User.objects.get(username='emma')
        response = self.client.get(f'/followers/23/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    # test that user can delete a follow
    def test_logged_in_user_can_delete_follow(self):
        self.client.login(username='sam', password='pass')
        response = self.client.delete(f'/followers/1/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    # test that user cannot delete someone elses follow
    def test_unauthorized_user_cannot_delete_follow(self):
        self.client.login(username='sam', password='pass')
        response = self.client.delete(f'/followers/2/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    # test that user cannot delete a follow logged out
    def test_logged_out_user_cannot_delete_follow(self):
        response = self.client.delete(f'/followers/2/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    # test logged in user cannot follow a user twice
    def test_logged_in_user_cannot_follow_a_user_twice(self):
        self.client.login(username='sam', password='pass')
        sam = User.objects.get(username='sam')
        emma = User.objects.get(username='emma')
        response = self.client.post(
            '/followers/',
            {
                'followed': emma.id
            }
        )
        self.assertEqual(response.data, {'detail': 'possible duplicate'})
