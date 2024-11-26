from rest_framework import status
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import generics, authentication, permissions

from event.api.v1.serializers import UserEventSerializer
from user.api.v1.serializers import SignUpSerializer, UserLoginSerializer, UserSerializer
from user.models import User
from django.db import transaction
from lib.mail import EmailManager
from lib.utils import get_full_url
from django.utils import timezone
from rest_framework.parsers import FormParser, MultiPartParser


class UserSignupView(generics.CreateAPIView):
    serializer_class = SignUpSerializer
    permission_classes = [permissions.AllowAny]
    parser_classes =(FormParser, MultiPartParser)

    @transaction.atomic
    def create(self, request: Request) -> Response:
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user_serializer =  UserSerializer(data=serializer.validated_data)
        user_serializer.is_valid(raise_exception=True)
        user = user_serializer.save()

        user_event_serializer  = UserEventSerializer(data=request.data)
        user_event_serializer.is_valid(raise_exception=True)
        user_event = user_event_serializer.save(user=user)

        # # send an email notification to user of their successful registrattion
        EmailManager.send_mail(
            subject=f'Finish Registration for UISC-{timezone.now().year}.',
            recipients=[user.email],
            context={'user': user, 'link': ''},
            template_name='user_registration_notification.html',
        )

        # send email notitification to all admins
        # notifying them of the submitted reciept
        # that will need verification
        admin_emails = list(User.objects.filter(is_staff=True, is_active=True).values_list('email', flat=True))
        EmailManager.send_mail(
            subject=f'Reciept Verification action needed',
            recipients=admin_emails,
            context={
                'user': user,
                # TODO (Joseph Miracle) # please update the link field once youre done with work on the admin
                'event_verification_link': get_full_url(self.request, f"admin/event/paymentreceipt/{user_event.receipt.id}"),
                'event_type': 'User registration'
            },
            template_name='admin_verification_request.html',
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
