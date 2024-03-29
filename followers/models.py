from django.db import models
from django.contrib.auth.models import User


class Follow(models.Model):
    """
    this class related to the 'owner',
    and is for user being able to follow another
    user.
    'unique_together' makes sure a user can't
    'double follow' the same user.
    """

    owner = models.ForeignKey(
        User, related_name='following', on_delete=models.CASCADE
    )
    followed = models.ForeignKey(
        User, related_name='followed', on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        unique_together = ['owner', 'followed']

    def __str__(self):
        return f'{self.owner} {self.followed}'
