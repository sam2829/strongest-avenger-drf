from rest_framework import generics, permissions
from .models import Report
from .serializers import ReportSerializer


class ReportCreate(generics.ListCreateAPIView):
    """
    this class is for user to create a report
    """
    serializer_class = ReportSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Report.objects.all() 

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
