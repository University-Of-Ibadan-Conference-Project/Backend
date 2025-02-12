from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import generics, authentication, permissions

from user.api.v1.serializers import SignUpSerializer, UserLoginSerializer, UserSerializer
from user.models import User
from django.db import transaction
from lib.mail import EmailManager
from django.utils import timezone
from django.conf import settings


class UserSignupView(generics.CreateAPIView):
    serializer_class = SignUpSerializer
    permission_classes = [permissions.AllowAny]

    @transaction.atomic
    def create(self, request: Request) -> Response:
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user_serializer =  UserSerializer(data=serializer.validated_data)
        user_serializer.is_valid(raise_exception=True)
        user = user_serializer.save()

        # # send an email notification to user of their successful registrattion
        EmailManager.send_mail(
            subject=f'Finish Registration for UISC-{timezone.now().year}.',
            recipients=[user.email],
            context={
                'user': user,
                'registration_link': f'{settings.FRONTENT_URL}/register',
                'clearance_submission_link': f'{settings.FRONTENT_URL}/submission',
                'abstract_submission_link': f'{settings.FRONTENT_URL}/submit-abstract',
            },
            template_name='user_registration_notification.html',
        )

        headers = self.get_success_headers(serializer.data)
        return Response(user_serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class UserLoginView(generics.CreateAPIView):
    serializer_class = UserLoginSerializer
    
    def perform_create(self, serializer):
        pass

class UserDetailView(generics.RetrieveUpdateAPIView):
    """Retrieve and update a users' details."""
    serializer_class = UserSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self) -> User:
        """Retrieve and return the authenticated user."""
        return self.request.user
