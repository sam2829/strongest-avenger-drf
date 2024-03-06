from django.contrib import admin
from .models import Comment


class CommentAdmin(admin.ModelAdmin):
    # Display for admin page
    list_display = (
        'owner_display', 'post_display', 'created_at', 'updated_at'
    )
    search_fields = ('owner__username', 'post__title', 'content')

    def owner_display(self, obj):
        return obj.owner.username

    def post_display(self, obj):
        return obj.post.title

    owner_display.short_description = 'Owner'
    post_display.short_description = 'Post'


admin.site.register(Comment, CommentAdmin)
