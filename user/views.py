from rest_framework import authentication, permissions
from rest_framework.authtoken.views import ObtainAuthToken

from rest_framework import generics, authentication, permissions
from rest_framework.generics import CreateAPIView, RetrieveUpdateAPIView
from rest_framework.settings import api_settings
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from .serializers import AuthTokenSerializer, UserSerializer

# Create your views here.


class CreateUserAPIView(CreateAPIView):
    serializer_class = UserSerializer


class CreateAuthToken(ObtainAuthToken):
    serializer_class = AuthTokenSerializer
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'email': user.email,
            'firstName': user.first_name,
            'lastName': user.lastname,
            'username': user.username
        })
        

class ManageUserView(generics.RetrieveUpdateAPIView):
    """Manage the authenticated user."""
    serializer_class = UserSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        """Retrieve and return the authenticated user."""
        return self.request.user