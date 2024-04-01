from django.db import models
from django.contrib.auth.models import User
from posts.models import Posts


class Comment(models.Model):
    """
    this model is to be related to the 'owner',
    'Posts' and is for user comments
    """

    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Posts, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    content = models.TextField(max_length=300)
    agree = models.BooleanField(default=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.content
