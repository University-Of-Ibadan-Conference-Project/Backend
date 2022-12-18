from rest_framework import serializers
from event.models import UserEvent


class UserEventSerializer(serializers.ModelSerializer):
    class  Meta:
        model = UserEvent
        fields = "__all__"
