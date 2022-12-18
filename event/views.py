from event.models import UserEvent
from .models import User
from rest_framework import generics, permissions, status
from event.serializers import UserEventSerializer
from rest_framework.response import Response



class UserEvent(generics.CreateAPIView):
    # permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserEventSerializer
    def post(self, request):
        serializer = UserEventSerializer( data = request.data)
        serializer.is_valid(raise_exception = True)
        return Response(serializer.data , status = status.HTTP_201_CREATED)
       






