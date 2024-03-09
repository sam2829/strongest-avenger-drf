from django.db import IntegrityError
from rest_framework import serializers
from .models import Follow


class FollowSerializer(serializers.ModelSerializer):
    """
    this class is to serialize the follow data
    """
    owner = serializers.ReadOnlyField(source='owner.username')
    followed_name = serializers.ReadOnlyField(source='followed.username')

    class Meta:
        model = Follow
        fields = [
            'id', 'owner', 'created_at', 'followed_name',
            'followed'
        ]
    print("not in create")
    def create(self, validated_data):
        print("in create")
        try:
            print("in try")
            return super().create(validated_data)
        except IntegrityError:
            print("in except")
            raise serializers.ValidationError({
                'detail': 'possible duplicate'
            })
