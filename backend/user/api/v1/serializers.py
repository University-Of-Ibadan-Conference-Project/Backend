from django.contrib.auth import authenticate
from rest_framework import serializers
from typing import Any
from event.api.v1.serializers import UserEventSerializer
from user.models import User
from rest_framework.authtoken.models import Token


class SignUpSerializer(serializers.Serializer):

    def get_fields(self):
        return {**UserSerializer().get_fields()}


class UserSerializer(serializers.ModelSerializer):
    event_reservation = UserEventSerializer(source='userevent', read_only=True, allow_null=True)

    class Meta:
        model = User
        fields = ["email", "first_name", "last_name", "password", 'phone','other_names', 'event_reservation']
        read_only_fields = ['event_reservation']
        extra_kwargs = {
            "password": {"write_only": True, "min_length": 6},
            "other_names": {'required': False},
        }

    def create(self, validated_data: dict[str, Any]) -> User:
        """Create a new user."""
        password = validated_data.pop("password")
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
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

