from django.db.models import QuerySet
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from event.models import Abstract

from event.api.v1.serializers import (
    AbstarctSerializer,
)


class AbstractListView(generics.ListCreateAPIView):
    serializer_class = AbstarctSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self) -> QuerySet:
        return Abstract.objects.filter(coresponding_author=self.request.user)


class AbstarctDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AbstarctSerializer
    permission_classes = (IsAuthenticated,)
    lookup_field = 'id'

    def get_queryset(self) -> QuerySet:
        return Abstract.objects.filter(coresponding_author=self.request.user)

    def get_object(self) -> Abstract:
        return self.request.user.abstract_set.get(id=self.kwargs['id'])

