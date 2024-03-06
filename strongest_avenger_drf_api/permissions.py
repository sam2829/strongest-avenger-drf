from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    This class is to other users being able to edit
    other users info
    """
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.owner == request.user
