from rest_framework import generics
from rest_framework.parsers import FormParser, MultiPartParser
from user.models import User
from event.api.v1.serializers import AbstarctSerializer, ClearanceFileSerializer, UserEventSerializer
from lib.mail import EmailManager
from django.utils import timezone
from rest_framework import generics, authentication, permissions


class EventDetailView(generics.RetrieveAPIView):
    serializer_class = UserEventSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = None

    def get_object(self) -> User:
        """Retrieve and return the authenticated user."""
        return self.request.user.userevent


class AbstractListView(generics.ListCreateAPIView):
    serializer_class = AbstarctSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = (FormParser, MultiPartParser)

    def get_queryset(self):
        return self.request.user.abstract_set.all()

    def perform_create(self, serializer):
        corresponding_author_email = serializer.validated_data.get('coresponding_author_email')
        abstract_title = serializer.validated_data.get('title')
        serializer.save(user=self.request.user)

        # send email notification to corresponding email  after uploading abstract
        EmailManager.send_mail(
            subject=f'Thank you for uploading your abstract for UISC-{timezone.now().year}',
            recipients=[corresponding_author_email],
            context={'abstract_title': abstract_title},
            template_name='abstract_upload_notification.html',
        )

        # send email notitification to all admins
        # notifying them of the submitted reciept
        # that will need verification
        admin_emails = list(User.objects.filter(is_staff=True, is_active=True).values_list('email', flat=True))
        EmailManager.send_mail(
            subject=f'Reciept Verification action needed',
            recipients=admin_emails,
            context={
                'user': self.request.user,
                # TODO (Joseph Miracle) # please update the link field once youre done with work on the admin
                'event_verification_link': '',
                'event_type': 'Abstract submission'
            },
            template_name='admin_verification_request.html',
        )


class ClearanceFileView(generics.ListCreateAPIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ClearanceFileSerializer
    parser_classes = (FormParser, MultiPartParser)

    def get_queryset(self):
        return self.request.user.clearancefile_set.all()

    def perform_create(self, serializer):
        record = serializer.save(user=self.request.user)

        # send email notification to user of successful receipt upload for Manuscript, Exhibition, and Advertisement
        EmailManager.send_mail(
            subject='Receipt Upload',
            recipients=[self.request.user.email],
            context={'submission_type': record.get_submission_type_display()},
            template_name='clearance_upload_notification.html',
        )

        # send email notitification to all admins
        # notifying them of the submitted reciept
        # that will need verification
        admin_emails = list(User.objects.filter(is_staff=True, is_active=True).values_list('email', flat=True))
        EmailManager.send_mail(
            subject=f'Reciept Verification action needed',
            recipients=admin_emails,
            context={
                'user': self.request.user, 
                # TODO (Joseph Miracle) # please update the link field once youre done with work on the admin
                'event_verification_link': '',
                'event_type': f'{record.get_submission_type_display()} Submission'
            },
            template_name='admin_verification_request.html',
        )
