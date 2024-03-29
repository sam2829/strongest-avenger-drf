from rest_framework import generics, permissions
from .models import Report
from .serializers import ReportSerializer


class ReportCreate(generics.CreateAPIView):
    """
    this class is for user to create a report
    """
    serializer_class = ReportSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
