from django.contrib import admin
from .models import Profile


class ProfileAdmin(admin.ModelAdmin):
    """
    This class is for the profiles displayed on the admin page
    """
    # Display for admin page
    list_display = (
        'owner', 'name', 'created_at', 'updated_at'
    )
    search_fields = ('owner__username', 'name')


admin.site.register(Profile, ProfileAdmin)
