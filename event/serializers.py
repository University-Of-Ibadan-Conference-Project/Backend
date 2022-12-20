from rest_framework import serializers
from .models import EventPaymentLog

class EventPaymentLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventPaymentLog
        fields = '__all__'