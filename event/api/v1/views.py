from django.db.models import QuerySet
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from event.models import Abstract, ClearanceFile
from rest_framework import permissions
from rest_framework.parsers import FormParser, MultiPartParser

from user.models import User

from event.api.v1.serializers import AbstarctSerializer, ClearanceFileSerializer
from lib.mail import EmailManager

class AbstractListView(generics.CreateAPIView):
    serializer_class = AbstarctSerializer
    permission_classes = (permissions.AllowAny, )


    def perform_create(self, serializer):
        corresponding_author_email = serializer.validated_data.get('coresponding_author_email')
        abstract_title = serializer.validated_data.get('title')
        abstract_file = serializer.validated_data.get('abstract_document_file')
        
        serializer.save()
    
        # send email notification to corresponding email  after uploading abstract
        EmailManager.send_mail(
            subject='Thank you for uploading your abstract for UISC-2023.',
            recipients=[corresponding_author_email],
            context={
                'abstract_title': abstract_title
                },
            template_name='abstract_upload_notification.html',
        )


class ClearanceFileView(generics.CreateAPIView):
    permissions_classes = (permissions.AllowAny,)
    serializer_class = ClearanceFileSerializer
    parser_classes =(FormParser, MultiPartParser)
    
    def perform_create(self, serializer):
        email = serializer.validated_data.get('email')
        submission_type = serializer.validated_data.get('submission_type')
        serializer.save()

        # send email notification to user of successful receipt upload for Manuscript, Exhibition, and Advertisement
        EmailManager.send_mail(
            subject='Receipt Upload',
            recipients=[email],
            context={
                'submission_type': submission_type
                },
            template_name='clearance_upload_notification.html',
        )

