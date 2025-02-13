from django.contrib.auth import authenticate
from rest_framework import serializers
from typing import Any
from event.models import PaymentReceipt, UserEvent
from event.api.v1.serializers import PyamentReceiptSerializer, UserEventSerializer
from user.models import User
from rest_framework.authtoken.models import Token


class SignUpSerializer(serializers.Serializer):

    def get_fields(self):
        return {**UserSerializer().get_fields()}


class UserSerializer(serializers.ModelSerializer):
    PARTICIPANT_TYPE_CHOICE = (
        ('Physical', 'Physical'),
        ('Virtual', 'Virtual'),
    )

    event_reservation = UserEventSerializer(source='userevent', read_only=True, allow_null=True)

    # event registration data.
    receipt = PyamentReceiptSerializer(read_only=True)
    receipt_file = serializers.FileField(
        source='receipt.payment_proff', 
        write_only=True, 
        required=False,
        allow_null=True,
    )

    affiliate_institution = serializers.CharField(write_only=True) 
    department = serializers.CharField(write_only=True) 
    country = serializers.CharField(write_only=True)
    state = serializers.CharField(write_only=True) 
    city = serializers.CharField(write_only=True)
    address = serializers.CharField(write_only=True, required=False)
    participant_type = serializers.ChoiceField(
        choices=PARTICIPANT_TYPE_CHOICE, 
        write_only=True,
    )


    class Meta:
        model = User
        fields = [
            "email", 
            "first_name", 
            "last_name", 
            "password", 
            "phone",
            "other_names",

            "event_reservation",
            "receipt",
            "receipt_file",
            "affiliate_institution", 
            "department", 
            "country", 
            "state", 
            "city",
            "address",
            "participant_type",
        ]
        read_only_fields = ['event_reservation']
        extra_kwargs = {
            "password": {"write_only": True, "min_length": 6},
            "other_names": {'required': False},
        }

    def create(self, validated_data: dict[str, Any]) -> User:
        """Create a new user."""

        # remove all event data.
        event_data = {
            "affiliate_institution": validated_data.pop("affiliate_institution", ''),
            "department": validated_data.pop("department", ''),
            "country": validated_data.pop("country", ),
            "state": validated_data.pop("state", ''),
            "city": validated_data.pop("city", ''),
            "address": validated_data.pop("address", ''),
            "participant_type": validated_data.pop("participant_type"),
        }

        password = validated_data.pop("password")
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save(update_fields=['password'])

        # create event data
        event = UserEvent.objects.create(**event_data, user=user)
        receipt_data = validated_data.pop('receipt', None)

        if receipt_data:
            receipt = PaymentReceipt.objects.create(**receipt_data)
            event.receipt = receipt
            event.save(update_fields=['receipt'])

        Token.objects.get_or_create(user=user)
        return user

    def update(self, instance: User, validated_data: dict[str, Any]) -> User:
        """Update user's data."""

        password = validated_data.pop("password")
        user = super().update(instance, validated_data)

        if password:
            user.set_password(password)
            user.save(update_fields=validated_data.keys())

        return user
    
    def to_representation(self, instance: User) -> dict[str, Any]:
        data = super().to_representation(instance=instance)
        token, _ = Token.objects.get_or_create(user=instance)

        return {
            **data,
            'token': str(token.key)
        }    


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, attrs: dict[str, Any]) -> User:
        """Validate serializer values."""

        user = authenticate(
            request=self.context.get("request"),
            email=attrs['email'],
            password=attrs['password'],
        )

        if not user:
            raise serializers.ValidationError({'errors': ["Invalid login credentials."]})

        return user
    
    def to_representation(self, instance: User) -> dict[str, Any]:        
        return UserSerializer(instance=instance).data

