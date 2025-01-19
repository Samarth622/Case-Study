from django.urls import path
from .views import ServiceRequestView, AdminServiceRequestStatusView

urlpatterns = [
    path('', ServiceRequestView.as_view(), name='service-request'),
    path('admin/', AdminServiceRequestStatusView.as_view(), name='admin-service-request'),
]
