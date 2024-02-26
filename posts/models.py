from django.db import models
from django.contrib.auth.models import User
from cloudinary_storage.storage import VideoMediaCloudinaryStorage
from cloudinary_storage.validators import validate_video
from django.db.models import Q


class Posts(models.Model):
    """
    This model is to related to the 'owner' and is for
    user posts
    """

    class MediaTypes(models.IntegerChoices):
        IMAGE = 1, 'Image'
        VIDEO = 2, 'Video'

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
    image = models.ImageField(
        upload_to='images/', null=True, blank=True
    )
    video = models.FileField(
        upload_to='media/',
        blank=True,
        null=True,
        storage=VideoMediaCloudinaryStorage(),
        validators=[validate_video]
    )

    def save(self, *args, **kwargs):
        if self.image and self.video:
            raise ValueError(
                "Only one media file is allowed: either image or video."
            )
        super().save(*args, **kwargs)


    class Meta:
        ordering = ['-created_at']
        # constraints = [
        #     models.CheckConstraint(
        #         check=Q(image__isnull=True) | Q(video__isnull=True),
        #         name='only_one_media_allowed'
        #     )
        # ]

    def __str__(self):
        return f'{self.id} {self.title}'
