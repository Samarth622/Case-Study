from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import ServiceRequest
from .serializers import ServiceRequestSerializer

class ServiceRequestView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ServiceRequestSerializer(data=request.data)
        if serializer.is_valid():
            # Set the user to the logged-in user automatically
            service_request = serializer.save(user=request.user)
            return Response(ServiceRequestSerializer(service_request).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        requests = ServiceRequest.objects.filter(user=request.user)
        serializer = ServiceRequestSerializer(requests, many=True)
        return Response(serializer.data)

class AdminServiceRequestStatusView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not request.user.is_admin:
            return Response({"error": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)
        requests = ServiceRequest.objects.all()
        serializer = ServiceRequestSerializer(requests, many=True)
        return Response(serializer.data)

    def post(self, request):
        if not request.user.is_admin:
            return Response({"error": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)
        data = request.data
        try:
            service_request = ServiceRequest.objects.get(id=data['id'])
            service_request.status = data['status']
            service_request.save()
            return Response({"message": "Status updated successfully"})
        except ServiceRequest.DoesNotExist:
            return Response({"error": "Service request not found"}, status=status.HTTP_404_NOT_FOUND)