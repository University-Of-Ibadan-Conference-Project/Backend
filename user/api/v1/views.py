from django import views
from rest_framework import status, views
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import generics, authentication, permissions
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from user.api.v1.serializers import UserLoginSerializer, UserSerializer
from user.models import User


class UserSignupView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]


class UserLoginView(views.APIView):
    serializer_class = UserLoginSerializer
    
    email_param_config = openapi.Parameter('email',  in_ = openapi.IN_QUERY, description = 'email', type = openapi.TYPE_STRING)
    password_param_config = openapi.Parameter('password',  in_ = openapi.IN_QUERY, description = 'password', type = openapi.TYPE_STRING)
    @swagger_auto_schema(manual_parameters = [email_param_config, password_param_config])
    def post(self, request: Request) -> Response:
        serializer = self.serializer_class(
            data=request.data,
            context={'request': request}
        )
        serializer.is_valid(raise_exception=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)


class UserDetailView(generics.RetrieveUpdateAPIView):
    """Retrieve and update a users' details."""
    serializer_class = UserSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self) -> User:
        """Retrieve and return the authenticated user."""
        return self.request.user


class LogOutView(APIView):
    def post(self, request, format = None):
        logout(request)
        return Response(status = status.HTTP_200_OK)

