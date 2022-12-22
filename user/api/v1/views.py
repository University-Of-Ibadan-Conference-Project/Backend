from rest_framework import status
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import generics, authentication, permissions

from user.api.v1.serializers import UserLoginSerializer, UserSerializer, UserEventSerializer, EventPaymentLogSerializer
from user.models import User
from django.db import transaction



class UserSignupView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    @transaction.atomic
    def create(self, request: Request) -> Response:
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        user_event_serializer  = UserEventSerializer(data=request.data, context={'user': user})
        user_event_serializer.is_valid(raise_exception=True)
        user_event_serializer.save()

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class UserLoginView(APIView):
    serializer_class = UserLoginSerializer

    def post(self, request: Request) -> Response:
        serializer = self.serializer_class(
            data=request.data,
            context={'request': request}
        )
        serializer.is_valid(raise_exception=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)


class UserDetailView(generics.RetrieveUpdateAPIView):
    """Retrieve and update a users' details."""
    serializer_class = UserSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self) -> User:
        """Retrieve and return the authenticated user."""
        return self.request.user


class EventDetailView(generics.RetrieveAPIView):
    serializer_class = UserEventSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = None

    def get_object(self) -> User:
        """Retrieve and return the authenticated user."""
        return self.request.user.userevent


class ReceiptUploadView(generics.CreateAPIView):
    serializer_class = EventPaymentLogSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

