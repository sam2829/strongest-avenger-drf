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
    def validate_media_file(self, value):
        if value.size > 1024 * 1024 * 2:
            raise serializers.ValidationError(
                'Media file larger than 2MB!'
            )
        # Check its a video thats been uploaded
        if value.name.lower().endswith(('.mp4', '.avi', '.mov', '.mkv', '.wmv')):
            try:
                # Check video duration
                with VideoFileClip(value.path) as video:
                    if video.duration > 120:
                        raise serializers.ValidationError('Video duration exceeds 120 seconds')
            except Exception as e:
                raise serializers.ValidationError('Error processing video file.')
        # check the dimensions for images
        else:
            try:
                with Image.open(value.path) as img:
                    width, height = img.size
                    if width > 4096 or height > 4096:
                        raise serializers.ValidationError('Image dimensions exceed 4096px')
            except Exception as e:
                raise serializers.ValidationError('Error processing image file.')
        return value

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    class Meta:
        model = Posts
        fields = [
            'id', 'owner', 'created_at', 'updated_at', 'character_name',
            'character_category', 'title', 'content', 'media_file',
            'is_owner'
        ]