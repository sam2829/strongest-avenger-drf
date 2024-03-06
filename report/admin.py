from django.contrib import admin
from .models import Report


class ReportAdmin(admin.ModelAdmin):
    """
    This class is for the reports displayed on the admin page
    """
    # Display for admin page
    list_display = (
        'owner_display', 'post_display', 'created_at', 'reason',
        'resolved'
    )
    search_fields = ('owner__username', 'post__title', 'reason')
    list_filter = ('resolved',)

    def owner_display(self, obj):
        return obj.owner.username

    def post_display(self, obj):
        return obj.post.title

    owner_display.short_description = 'Owner'
    post_display.short_description = 'Post'


admin.site.register(Report, ReportAdmin)
