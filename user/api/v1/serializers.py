from django.contrib.auth import authenticate
from rest_framework import serializers
from typing import Any
from user.models import EventPaymentLog, User, UserEvent
from rest_framework.authtoken.models import Token


class UserSerializer(serializers.ModelSerializer):

    participant_type = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            "email", "first_name", "last_name", "password", 'phone','other_names',
            'affiliate_institution', 'department', 'country', 
            'state', 'city', 'address', 'participant_type',
        ]
        extra_kwargs = {"password": {"write_only": True, "min_length": 6}}
    
    def create(self, validated_data: dict[str, Any]) -> User:
        """Create a new user."""
        # NOTE: it's important to remove this field from validated data
        # TODO JOSEPH:  remove this when you have time
        validated_data.pop('participant_type')
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


class EventPaymentLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventPaymentLog
        fields = ['receipt', 'payment_datetime', 'status','failure_reason']
        read_only_fields = ['payment_datetime', 'status','failure_reason']

    def update(self, instance, validated_data):
        """Overide this method we dont want update."""

    def validate(self, attrs):        
        request = self.context['request']
        user  = request.user
        attrs['user'] = user
        attrs['user_event'] = user.userevent
        return super().validate(attrs)


class UserEventSerializer(serializers.ModelSerializer):

    payment_log = EventPaymentLogSerializer(read_only=True, source='eventpaymentlog')

    class Meta:
        model = UserEvent
        fields = [
            'affiliate_institution', 'department', 'country', 
            'state', 'city', 'address', 'participant_type', 'date_created', 'payment_log'
        ]

        read_only_fields = ['date_created']
    
    def update(self, instance, validated_data):
        """Overide this event we dont want it to be updated."""

    def validate(self, attrs: dict[str, Any]) -> dict[str, Any]:
        """Validate serializer."""
        data = super().validate(attrs)

        try:
            user = self.context['user']
        except KeyError as error:
            raise ValueError('User object needs to be added to context for this serializer.') from error

        data.update({'user': user})

        return data
