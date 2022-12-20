from typing import Any
from rest_framework import serializers
from event.models import Abstract

from event.models import EventPaymentLog


class CoAuthorSerializer(serializers.Serializer):
    email = serializers.EmailField()
    title = serializers.CharField(max_length=10, required=False)
    affiliate_intitute = serializers.CharField(max_length=150, required=False)
    first_name = serializers.CharField(max_length=150)
    last_name = serializers.CharField(max_length=150)


class AbstarctSerializer(serializers.ModelSerializer):
    co_authors = CoAuthorSerializer(many=True)

    class Meta:
        model = Abstract
        fields = [
            'title', 'coresponding_author', 'coresponding_author_email', 'co_authors', 'keywords',
            'abstract_document_file', 'abstract_text', 'research_area', 'coresponding_author_phone'
        ]

        read_only_fields = ['coresponding_author']

    def validate(self, attrs: dict[str, Any]) -> dict[str, Any]:
        attrs = super().validate(attrs)

        request = self.context.get('request')
 
        if not request:
            raise ValueError('request object needs to be passed to the context.')

        attrs['coresponding_author'] = request.user
        return attrs



class EventPaymentLogSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField()

    class Meta:
        model = EventPaymentLog
        fields = ['user','status','receipt']

    def update(self, instance, validated_data):

        if 'user' in validated_data:
            raise serializers.ValidationError("The user field is read-only and cannot be changed.")

        return super().update(instance, validated_data)