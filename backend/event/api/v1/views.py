from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.parsers import FormParser, MultiPartParser
from event.models import ClearanceFile, UserContactRequest, UserEvent
from user.models import User
from event.api.v1.serializers import AbstarctSerializer, ClearanceFileSerializer, ContactUsSerializer, UserEventSerializer
from lib.mail import EmailManager
from lib.utils import get_full_url
from django.utils import timezone
from rest_framework import generics, authentication, permissions



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
        abstract = serializer.save(user=self.request.user)

        # send email notification to corresponding email  after uploading abstract
        EmailManager.send_mail(
            subject=f'Thank you for uploading your abstract for UI Science Conference-{timezone.now().year}',
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
                'event_verification_link': get_full_url(
                    request=self.request, 
                    path=f'admin/event/paymentreceipt/{abstract.receipt.id}/'
                ),
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

    def perform_create(self, serializer: ClearanceFileSerializer):
        record = serializer.save(user=self.request.user)

        if serializer.validated_data['submission_type'] == ClearanceFile.SUBMISSION_TYPE_EVENT:
            # if the submission type is event attach reciept to users event
            event = self.request.user.event
            event.receipt = record.receipt
            event.save(update_fields=['receipt'])

        # send email notification to user of successful receipt upload for Manuscript, Exhibition, and Advertisement
        EmailManager.send_mail(
            subject='Receipt Upload',
            recipients=[self.request.user.email],
            context={'submission_type': serializer.validated_data['submission_type']},
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
                'event_verification_link': get_full_url(
                    request=self.request, 
                    path=f"admin/event/paymentreceipt/{record.receipt.id}"
                ),
                'event_type': f'{serializer.validated_data['submission_type']} Submission'
            },
            template_name='admin_verification_request.html',
        )


class ContactUsView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ContactUsSerializer
    parser_classes = (FormParser, MultiPartParser)

    def perform_create(self, serializer: ContactUsSerializer):
        user_contact_request: UserContactRequest = serializer.save()

        EmailManager.send_mail(
            subject=f'Contact us request received.',
            recipients=[user_contact_request.email],
            context={
                'user_full_name': user_contact_request.full_name,
                'user_email': user_contact_request.email,
                'timestamp': user_contact_request.date_created,
            },
            template_name='contact_us_email_recieved.html',
        )

        admin_emails = list(User.objects.filter(is_staff=True, is_active=True).values_list('email', flat=True))
        EmailManager.send_mail(
            subject=f'Action needed to resolve user inquiry',
            recipients=admin_emails,
            context={
                'user_full_name': user_contact_request.full_name,
                'user_email': user_contact_request.email,
                'admin_dashboard_contact_us_link': get_full_url(
                    request=self.request, 
                    path=f"admin/event/usercontactrequest/{user_contact_request.id}/"
                )
            },
            template_name='admin_contact_us_notification.html',
        )


class EventRegistrationView(generics.CreateAPIView, generics.RetrieveAPIView):
    serializer_class = UserEventSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = (FormParser, MultiPartParser)
    lookup_field = None

    def get_object(self) -> User:
        """Retrieve and return the authenticated user."""
        return get_object_or_404(UserEvent, user=self.request.user)

    def perform_create(self, serializer: UserEventSerializer) -> None:
        """Create event records."""
        user_event = serializer.save(user=self.request.user)

        # # send an email notification to user of their successful registrattion
        EmailManager.send_mail(
            subject=f'Finish Registration for UISC-{timezone.now().year}.',
            recipients=[self.request.user.email],
            context={'user': self.request.user},
            template_name='event_verification_notification.html',
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
                'event_verification_link': get_full_url(
                    request=self.request, 
                    path=f"admin/event/paymentreceipt/{user_event.receipt.id}"
                ),
                'event_type': 'User registration'
            },
            template_name='admin_verification_request.html',
        )

