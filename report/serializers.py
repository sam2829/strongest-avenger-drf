from rest_framework import serializers
from .models import Report, Posts


class ReportSerializer(serializers.ModelSerializer):
    """
    this class is to serialize the report data
    """
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Report
        fields = [
            'id', 'owner', 'post', 'created_at',
            'reason', 'description'
        ]