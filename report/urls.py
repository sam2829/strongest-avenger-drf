from django.urls import path
from report import views


urlpatterns = [
    path('report/', views.ReportCreate.as_view(), name='report-create'),
    path('report/<int:pk>/', views.ReportDetail.as_view()),
]
