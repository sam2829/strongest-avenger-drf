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
        self.sam = User.objects.create_user(
            username='sam_profile', password='pass'
        )
        self.post = Posts.objects.create(
            owner=self.sam,
            title='test title'
        )

    # test list of reports are displayed
    def test_can_list_reports(self):
        sam = User.objects.get(username='sam_profile')
        Report.objects.create(
            post=self.post,
            owner=sam,
            reason='spam',
            description='Testing'
        )
        response = self.client.get('/api/report/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # test logged in user can create a report
    def test_logged_in_user_can_create_report(self):
        self.client.login(username='sam_profile', password='pass')
        response = self.client.post(
            '/api/report/',
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
            '/api/report/',
            {
                'post': self.post.id,
                'reason': 'spam',
                'description': 'this is test',
            }
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class ReportDetailViewTests(APITestCase):
    """
    this class is for testing the Report Detail views
    """
    def setUp(self):
        self.sam = User.objects.create_user(
            username='sam_report', password='pass'
        )
        self.emma = User.objects.create_user(
            username='emma_report', password='pass'
        )
        self.post = Posts.objects.create(
            owner=self.sam,
            title='test title'
        )
        self.report = Report.objects.create(
            post=self.post,
            owner=self.sam,
            reason='spam',
            description='this is test',
        )
        self.report_2 = Report.objects.create(
            post=self.post,
            owner=self.emma,
            reason='spam',
            description='this is test 2',
        )

    # test that user can retrieve single report by id
    def test_can_retrieve_report_detail(self):
        self.client.login(username='sam_report', password='pass')
        response = self.client.get(f'/api/report/1/')
        self.assertEqual(response.data['description'], 'this is test')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # test that user cannot retrieve single report by id of other user
    def test_cannot_retrieve_report_detail_of_other_user(self):
        self.client.login(username='sam_report', password='pass')
        response = self.client.get(f'/api/report/2/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    # test that logged in user can update their own report
    def test_logged_in_user_can_update_their_own_report(self):
        self.client.login(username='sam_report', password='pass')
        response = self.client.put(
            '/api/report/1/',
            {
                'post': self.post,
                'owner': self.sam,
                'reason': 'spam',
                'description': 'this is updated',
            }
        )
        report = Report.objects.filter(pk=1).first()
        self.assertEqual(report.description, 'this is updated')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # test that logged out user cannot update their own report
    def test_logged_out_user_cannot_update_their_own_report(self):
        response = self.client.put(
            '/api/report/1/',
            {
                'post': self.post,
                'owner': self.sam,
                'reason': 'spam',
                'description': 'this is updated',
            }
        )
        report = Report.objects.filter(pk=1).first()
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    # test that user can delete a report
    def test_logged_in_user_can_delete_report(self):
        self.client.login(username='sam_report', password='pass')
        response = self.client.delete(f'/api/report/1/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    # test that user cannot delete another users report
    def test_logged_in_user_cannot_delete_another_users_report(self):
        self.client.login(username='sam_report', password='pass')
        response = self.client.delete(f'/api/report/2/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
