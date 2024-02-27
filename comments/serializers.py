from rest_framework import serializers
from .models import Comment, Posts


class CommentSerializer(serializers.ModelSerializer):
    """
    this class is to serialize the comment data
    """
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    profile_id = serializers.ReadOnlyField(source='owner.profile.id')
    profile_image = serializers.ReadOnlyField(source='owner.profile.image.url')

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    class Meta:
        model = Comment
        fields = [
            'id', 'owner', 'created_at', 'updated_at', 'post',
            'content', 'agree','is_owner', 'profile_id',
            'profile_image'
        ]

class CommentDetailSerializer(CommentSerializer):
    """
    this class is for detail view. Post is a read
    only field so that we dont have to set it on
    each update
    """
    post = serializers.ReadOnlyField(source='post.id')