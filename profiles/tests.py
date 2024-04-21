from django.contrib.auth.models import User
from .models import Profile
from rest_framework import status
from rest_framework.test import APITestCase


class ProfileListViewTests(APITestCase):
    """
    this class is for testing the ProfileList views
    """
    # setup logged in user
    def setUp(self):
        sam = User.objects.create_user(username='sam', password='pass')

    # test list of profiles are displayed
    def test_can_list_profiles(self):
        response = self.client.get('/api/profiles/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class ProfileDetailViewTests(APITestCase):
    """
    this class is for testing the Profile Detail views
    """
    # setup logged in users
    def setUp(self):
        sam = User.objects.create_user(username='sam', password='pass')
        emma = User.objects.create_user(username='emma', password='pass')

    # test that user can retrieve single profile by id
    def test_can_retrieve_profile_detail(self):
        response = self.client.get(f'/api/profiles/1/')
        self.assertEqual(response.data['owner'], 'sam')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # test user cannot retrieve a profile with invalid id
    def test_cannot_retrieve_profile_detail_using_invalid_id(self):
        response = self.client.get(f'/api/profiles/23/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    # test that user can update a profile
    def test_logged_in_user_can_update_profile(self):
        self.client.login(username='sam', password='pass')
        response = self.client.put(
            '/api/profiles/1/',
            {
                'name': 'sam28',
                'favourite_character': 'thor',
                'content': 'updated content',
            }
        )
        profile = Profile.objects.filter(pk=1).first()
        self.assertEqual(profile.name, 'sam28')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # test that user cannot updated someone elses profile
    def test_logged_in_user_cannot_update_anothers_profile(self):
        self.client.login(username='sam', password='pass')
        response = self.client.put(
            '/api/profiles/2/',
            {
                'name': 'sam28',
                'favourite_character': 'thor',
                'content': 'updated content',
            }
        )
        profile = Profile.objects.filter(pk=2).first()
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    # test that user cannot update profile logged out
    def test_logged_out_user_cannot_update_profile(self):
        response = self.client.put(
            f'/api/profiles/1/',
            {
                'name': 'sam28',
                'favourite_character': 'thor',
                'content': 'updated content',
            }
        )
        profile = Profile.objects.filter(pk=1).first()
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
