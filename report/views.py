from rest_framework import generics, permissions
from .models import Report
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import ReportSerializer, ReportDetailSerializer


class ReportCreate(generics.ListCreateAPIView):
    """
    this class is for user to create a report
    """
    serializer_class = ReportSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Report.objects.all()
    filter_backends = [
        DjangoFilterBackend,
    ]
    filterset_fields = [
        'owner'
    ]

    def get_queryset(self):
        """
        Filter queryset to include only reports of the current user.
        """
        if self.request.user.is_authenticated:
            return Report.objects.filter(owner=self.request.user)
        else:
            # Return empty queryset for unauthenticated users
            return Report.objects.none()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ReportDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    this class is to be able to retrieve reports by id,
    update and delete comment
    """
    serializer_class = ReportDetailSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Report.objects.all()

    def get_queryset(self):
        """
        Filter queryset to include only reports of the current user.
        """
        if self.request.user.is_authenticated:
            return Report.objects.filter(owner=self.request.user)
        else:
            # Return empty queryset for unauthenticated users
            return Report.objects.none()

