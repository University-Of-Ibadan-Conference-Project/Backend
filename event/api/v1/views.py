from django.db.models import QuerySet
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from event.models import Abstract, ClearanceFile
from rest_framework import permissions
from rest_framework.parsers import FormParser, MultiPartParser

from event.api.v1.serializers import AbstarctSerializer, ClearanceFileSerializer


class AbstractListView(generics.CreateAPIView):
    serializer_class = AbstarctSerializer
    permission_classes = (permissions.AllowAny, )


class ClearanceFileView(generics.CreateAPIView):
    permissions_classes = (permissions.AllowAny,)
    serializer_class = ClearanceFileSerializer
    parser_classes =(FormParser, MultiPartParser)
