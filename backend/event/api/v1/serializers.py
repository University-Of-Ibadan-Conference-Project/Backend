from typing import Any
from rest_framework import serializers
from event.models import Abstract, ClearanceFile, PaymentReceipt, UserEvent


class PyamentReceiptSerializer(serializers.ModelSerializer):

    class Meta:
        model = PaymentReceipt
        fields = [
            'status', 'payment_proff', 'failure_reason'
        ]
        read_only_fields = ['status', 'failure_reason']



class CoAuthorSerializer(serializers.Serializer):

    co_authors = serializers.CharField()

    def validate(self, attrs: dict[str, Any]) -> list[dict[str, Any]]:
        """
            Validate co_authors field.
            field is a string with the format:
            title,Firstname,Lastname,affiliate_institute;
        """
        value = attrs['co_authors']
        co_authors = value.split(';')

        cleaned_data = []

        for author_data in co_authors:
            if author_data.strip() != '':
                data = author_data.split(',')

                if (len(data) < 3) or (len(data) > 4):
                    raise serializers.ValidationError(f'Input Error at {author_data}')

                cleaned_data.append(
                    {
                        'title': data[0].strip(),
                        'first_name': data[1].strip(),
                        'last_name': data[2].strip(),
                        'affiliate_intitute': data[3].strip() if len(data) == 4 else None
                    }
                )

        return cleaned_data
    
    def to_representation(self, instance: list[dict[str, Any]]) -> list[dict[str, Any]]:
        return instance


class AbstarctSerializer(serializers.ModelSerializer):
    receipt = PyamentReceiptSerializer(read_only=True)
    receipt_file = serializers.FileField(source='receipt.payment_proff', write_only=True)
    keywords = serializers.ListField(child=serializers.CharField())

    class Meta:
        model = Abstract
        fields = [
            'title', 'coresponding_author_email', 'keywords', 'presentation_type',
            'abstract_document_file', 'research_area', 'coresponding_author_phone',
            'receipt', 'receipt_file',
        ]

        read_only_fields = ['coresponding_author']
        required_fields = fields

    def create(self, validated_data: dict[str, Any]) -> Abstract:
        """Attach payment reciept to event."""
        receipt_data = validated_data.pop('receipt')
        validated_data['receipt'] = PaymentReceipt.objects.create(**receipt_data)
        return super().create(validated_data)

 
class ClearanceFileSerializer(serializers.ModelSerializer):
    receipt = PyamentReceiptSerializer(read_only=True)
    receipt_file = serializers.FileField(source='receipt.payment_proff', write_only=True)

    class Meta:
        model = ClearanceFile
        fields = ['submission_type', 'submission_file', 'receipt', 'receipt_file']

    def create(self, validated_data: dict[str, Any]) -> ClearanceFile:
        """Attach payment reciept to event."""
        receipt_data = validated_data.pop('receipt')
        validated_data['receipt'] = PaymentReceipt.objects.create(**receipt_data)
        return super().create(validated_data)


class UserEventSerializer(serializers.ModelSerializer):

    receipt = PyamentReceiptSerializer(read_only=True)
    receipt_file = serializers.FileField(source='receipt.payment_proff', write_only=True)

    class Meta:
        model = UserEvent
        fields = [
            'affiliate_institution', 'department', 'country', 'receipt', 'receipt_file',
            'state', 'city', 'address', 'participant_type', 'date_created',
        ]
        read_only_fields = ['date_created', 'receipt']

    def create(self, validated_data: dict[str, Any]) -> UserEvent:
        """Attach payment reciept to event."""
        receipt_data = validated_data.pop('receipt')
        validated_data['receipt'] = PaymentReceipt.objects.create(**receipt_data)
        return super().create(validated_data)
