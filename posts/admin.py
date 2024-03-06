from django.contrib import admin
from .models import Posts


class PostsAdmin(admin.ModelAdmin):
    """
    This class is for the posts displayed on the admin page
    """
    # Display for admin page
    list_display = (
        'owner', 'created_at', 'updated_at', 'title',
        'character_name', 'character_category'
    )
    search_fields = ('owner__username', 'title', 'character_name')


admin.site.register(Posts, PostsAdmin)
