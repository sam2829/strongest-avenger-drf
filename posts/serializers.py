from rest_framework import serializers
from .models import Posts
#from moviepy.editor import VideoFileClip
from PIL import Image
from likes.models import Like


class PostsSerializer(serializers.ModelSerializer):
    """
    This class is to serialize the posts data
    """
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    profile_id = serializers.ReadOnlyField(source='owner.profile.id')
    profile_image = serializers.ReadOnlyField(source='owner.profile.image.url')
    like_id = serializers.SerializerMethodField()
    comments_count = serializers.ReadOnlyField()
    likes_count = serializers.ReadOnlyField()

    # Check one of the image or video files have been uploaded,
    # also check both havnt been uploaded
    def validate(self, data):
        image = data.get('image')
        video = data.get('video')

        if not image and not video:
            raise serializers.ValidationError(
                "Either 'image' or 'video' field must be provided."
            )

        if image and video:
            raise serializers.ValidationError(
                "Only one media file is allowed: either image or video."
            )

        if image:
            self.validate_image(image)

        if video:
            self.validate_video(video)

        return data

    # validate image uploaded
    def validate_image(self, value):

        if not value:
            return value

        image = value.image

        if image:

            if value.size > 1024 * 1024 * 2:
                raise serializers.ValidationError(
                    'Image file larger than 2MB!'
                )
            
            if value.image.width > 4096:
                raise serializers.ValidationError(
                    'Image width larger than 4096px!'
                )
            
            if value.image.height > 4096:
                raise serializers.ValidationError(
                    'Image height larger than 4096px!'
                )

            return value

    #validate video file uploaded
    def validate_video(self, value):

        if value:
            try:
                video_clip = VideoFileClip(value.temporary_file_path())
                duration = video_clip.duration

                if duration > 120:
                    raise serializers.ValidationError(
                        'Video duration should be less than 120 seconds.'
                    )
            except Exception as e:
                raise serializers.ValidationError(
                    'Error processing the video file.'
                )

        return value

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    def get_like_id(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            like = Like.objects.filter(
                owner=user, post=obj
            ).first()
            return like.id if like else None
        return None

    class Meta:
        model = Posts
        fields = [
            'id', 'owner', 'created_at', 'updated_at', 'character_name',
            'character_category', 'title', 'content', 'image', 'video',
            'is_owner', 'profile_id', 'profile_image', 'like_id',
            'comments_count', 'likes_count'
        ]
