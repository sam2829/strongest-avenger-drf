# from django.contrib.auth.models import User
# import io
# from PIL import Image
# from .models import Posts
# from rest_framework import status
# from rest_framework.test import APITestCase
# from django.core.files.uploadedfile import SimpleUploadedFile


# class PostListViewTests(APITestCase):
#     """
#     this class is for testing the PostList views
#     """
#     # setup logged in user
#     def setUp(self):
#         User.objects.create_user(username='sam', password='pass')

#     # test list of posts are displayed
#     def test_can_list_posts(self):
#         sam = User.objects.get(username='sam')
#         Posts.objects.create(owner=sam, title='test title')
#         response = self.client.get('/posts/')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)

#     # create a image for testing
#     def generate_image(self):
#         file = io.BytesIO()
#         image = Image.new('RGBA', size=(100, 100), color=(0, 255, 0, 255))  # Green color with full opacity
#         image.save(file, 'png')
#         file.name = 'test.png'
#         file.seek(0)
#         return file

#     # test logged in user can create a post
#     def test_logged_in_user_can_create_post(self):
#         self.client.login(username='sam', password='pass')
#         image = self.generate_image()
#         response = self.client.post(
#             '/posts/',
#             {
#                 'title': 'test title',
#                 'character_name': 'test character',
#                 'character_category': 'Avenger',
#                 'content': 'test content',
#                 'image': image,
#             }
#         )
#         count = Posts.objects.count()
#         self.assertEqual(count, 1)
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)

#     # test a logged out user cannot create a post
#     def test_logged_out_user_cannot_create_post(self):
#         image = self.generate_image()
#         response = self.client.post(
#             '/posts/',
#             {
#                 'title': 'test title',
#                 'character_name': 'test character',
#                 'character_category': 'Avenger',
#                 'content': 'test content',
#                 'image': image,
#             }
#         )
#         self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

# class PostDetailViewTests(APITestCase):
#     """
#     this class is for testing the Post Detail views
#     """
#     # setup logged in users
#     def setUp(self):
#         sam = User.objects.create_user(username='sam', password='pass')
#         emma = User.objects.create_user(username='emma', password='pass')
#         Posts.objects.create(owner=sam, title='test title', content='sam content')
#         Posts.objects.create(owner=emma, title='another title', content='emma content')


#     # create a image for testing
#     def generate_image(self):
#         file = io.BytesIO()
#         image = Image.new('RGBA', size=(100, 100), color=(0, 255, 0, 255))
#         image.save(file, 'png')
#         file.name = 'test.png'
#         file.seek(0)
#         return file

#     # test that user can retrieve single post by id
#     def test_can_retrieve_post_detail(self):
#         response = self.client.get(f'/posts/1/')
#         self.assertEqual(response.data['title'], 'test title')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)

#     # test user cannot retrieve a post with invalid id
#     def test_cannot_retrieve_post_detail_using_invalid_id(self):
#         response = self.client.get(f'/posts/23/')
#         self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


#     # test that user can update a post
#     def test_logged_in_user_can_update_post(self):
#         image = self.generate_image()
#         self.client.login(username='sam', password='pass')
#         response = self.client.put(
#             '/posts/1/',
#             {
#                 'title': 'updated title',
#                 'character_name': 'test character',
#                 'character_category': 'Avenger',
#                 'content': 'updated content',
#                 'image': image,
#             }
#         )
#         post = Posts.objects.filter(pk=1).first()
#         self.assertEqual(post.title, 'updated title')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)

#     # test that user cannot updated someone elses post
#     def test_logged_in_user_cannot_update_anothers_post(self):
#         image = self.generate_image()
#         self.client.login(username='sam', password='pass')
#         response = self.client.put(
#             '/posts/2/',
#             {
#                 'title': 'updated title',
#                 'character_name': 'test character',
#                 'character_category': 'Avenger',
#                 'content': 'updated content',
#                 'image': image,
#             }
#         )
#         post = Posts.objects.filter(pk=2).first()
#         self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

#     # test that user cannot update post logged out
#     def test_logged_out_user_cannot_update_post(self):
#         image = self.generate_image()
#         response = self.client.put(
#             f'/posts/1/',
#             {
#                 'title': 'updated title',
#                 'character_name': 'test character',
#                 'character_category': 'Avenger',
#                 'content': 'updated content',
#                 'image': image,
#             }
#         )
#         post = Posts.objects.filter(pk=1).first()
#         self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

#     # test that user can delete a post
#     def test_logged_in_user_can_delete_post(self):
#         self.client.login(username='sam', password='pass')
#         response = self.client.delete(f'/posts/1/')
#         self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

#     # test that user cannot delete someone elses post
#     def test_unauthorized_user_cannot_delete_post(self):
#         self.client.login(username='sam', password='pass')
#         response = self.client.delete(f'/posts/2/')
#         self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

#     # test that user cannot delete a post logged out
#     def test_logged_out_user_cannot_delete_post(self):
#         response = self.client.delete(f'/posts/2/')
#         self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


#     # test invalid data in post is not accepted
#     def test_invalid_post_data(self):
#         self.client.login(username='sam', password='pass')
#         image = self.generate_image()
#         response = self.client.post(
#             '/posts/',
#             {
#                 'title': 'updated title',
#                 'character_name': 'test character',
#                 'character_category': 'Not a character',
#                 'content': 'updated content',
#                 'image': image,
#             }
#         )
#         self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)