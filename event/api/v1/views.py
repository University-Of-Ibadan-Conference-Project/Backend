from django.db.models import QuerySet
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from event.models import Abstract
from rest_framework import permissions

from event.api.v1.serializers import AbstarctSerializer


class AbstractListView(generics.CreateAPIView):
    serializer_class = AbstarctSerializer
    permission_classes = (permissions.AllowAny,)

