from rest_framework import serializers
from .models import Report, Posts


class ReportSerializer(serializers.ModelSerializer):
    """
    this class is to serialize the report data
    """
    owner = serializers.ReadOnlyField(source='owner.username')

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    class Meta:
        model = Report
        fields = [
            'id', 'owner', 'post', 'created_at',
            'reason', 'description', 'resolved', 
        ]


class ReportDetailSerializer(ReportSerializer):
    """
    this class is for detail view. Report is a read
    only field so that we dont have to set it on
    each update
    """
    post = serializers.ReadOnlyField(source='post.id')
