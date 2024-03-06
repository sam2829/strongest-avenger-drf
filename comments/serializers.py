from django.contrib.humanize.templatetags.humanize import naturaltime
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
    created_at = serializers.SerializerMethodField()
    updated_at = serializers.SerializerMethodField()

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    def get_created_at(self, obj):
        return naturaltime(obj.created_at)

    def get_updated_at(self, obj):
        return naturaltime(obj.updated_at)

    class Meta:
        model = Comment
        fields = [
            'id', 'owner', 'created_at', 'updated_at', 'post',
            'content', 'agree', 'is_owner', 'profile_id',
            'profile_image'
        ]


class CommentDetailSerializer(CommentSerializer):
    """
    this class is for detail view. Post is a read
    only field so that we dont have to set it on
    each update
    """
    post = serializers.ReadOnlyField(source='post.id')
