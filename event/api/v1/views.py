from django.db.models import QuerySet
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from event.models import Abstract

from event.api.v1.serializers import (
    AbstarctSerializer,
    UserEventSerializer
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
    
class UserEventView(generics.CreateAPIView):
    serializer_class = UserEventSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = UserEventSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save(user = self.request.user)
        return Response(serializer.data , status = status.HTTP_201_CREATED)
       





