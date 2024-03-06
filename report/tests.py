from django.contrib.auth.models import User
from .models import Report
from rest_framework import status
from rest_framework.test import APITestCase
from posts.models import Posts


class ProfileListViewTests(APITestCase):
    """
    this class is for testing the ProfileList views
    """
    # setup logged in user
    def setUp(self):
        sam = User.objects.create_user(username='sam', password='pass')
        self.post = Posts.objects.create(
            owner=sam,
            title='test title'
        )

    # test logged in user can create a report
    def test_logged_in_user_can_create_report(self):
        self.client.login(username='sam', password='pass')
        response = self.client.post(
            '/report/',
            {
                'post': self.post.id,
                'reason': 'spam',
                'description': 'this is test',
            }
        )
        count = Report.objects.count()
        self.assertEqual(count, 1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    # test a logged out user cannot create a report
    def test_logged_out_user_cannot_create_report(self):
        response = self.client.post(
            '/report/',
            {
                'post': self.post.id,
                'reason': 'spam',
                'description': 'this is test',
            }
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
