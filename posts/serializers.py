from rest_framework import serializers
from .models import Posts
from moviepy.editor import VideoFileClip


class PostsSerializer(serializers.ModelSerializer):
    """
    This class is to serialize the posts data
    """
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    profile_id = serializers.ReadOnlyField(source='owner.profile.id')
    profile_image = serializers.ReadOnlyField(source='owner.profile.image.url')

    # Making sure media file isn't to big
    # def validate_image(self, value):

    #     if value.size > 1024 * 1024 * 2:
    #         raise serializers.ValidationError(
    #             'Media file larger than 2MB!'
    #         )
    #     return value

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    class Meta:
        model = Posts
        fields = [
            'id', 'owner', 'created_at', 'updated_at', 'character_name',
            'character_category', 'title', 'content', 'image', 'video',
            'is_owner', 'profile_id', 'profile_image'
        ]