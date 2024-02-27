from django.db import models
from django.contrib.auth.models import User
from posts.models import Posts


class Like(models.Model):
    """
    this class is to be related to the 'owner',
    'Posts' and is for user likes.
    'unique_together' makes sure a user can't
    like the same post twice.
    """

    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(
        Posts, related_name='likes', on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        unique_together = ['owner', 'post']

    def __str__(self):
        return f'{self.owner} {self.post}'
