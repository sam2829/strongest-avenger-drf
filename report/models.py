from django.db import models
from django.contrib.auth.models import User
from posts.models import Posts


class Report(models.Model):
    """
    this class is linked to the owner and post,
    so that a user can report any issues.
    """
    REASON_CHOICES = [
        ('spam', 'Spam'),
        ('harassment', 'Harassment'),
        ('inappropriate_content', 'Inappropriate Content'),
        ('character_in_wrong_category', 'Character In Wrong Category'),
        ('other', 'Other'),
    ]

    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Posts, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    reason = models.CharField(max_length=30, choices=REASON_CHOICES)
    description = models.TextField()
    resolved = models.BooleanField(default=False)

    class Meta:
        ordering = ['resolved', '-created_at']

    def __str__(self):
        return f'{self.reason} {self.description}'