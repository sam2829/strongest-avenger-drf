from django.db import models
from django.contrib.auth.models import User


class Posts(models.Model):
    """
    This model is to related to the 'owner' and is for
    user posts
    """

    # list of choices for character categories
    AVENGER = 'Avenger'
    X_MEN = 'X-Men'
    ANTI_HERO = 'Anti-Hero'
    VILLAIN = 'Villain'

    CHARACTER_CATEGORY_CHOICES = [
        (AVENGER, 'Avenger'),
        (X_MEN, 'X-Men'),
        (ANTI_HERO, 'Anti-Hero'),
        (VILLAIN, 'Villain'),
    ]

    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    character_name = models.CharField(max_length=50)
    character_category = models.CharField(
        max_length=20, choices=CHARACTER_CATEGORY_CHOICES
    )
    title = models.CharField(max_length=255)
    content = models.TextField()
    media_file = models.FileField(
        upload_to='images/', default='default_post_atyvne', blank=True
    )

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.id} {self.title}'
