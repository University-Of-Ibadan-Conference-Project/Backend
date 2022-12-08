from django.urls import path
from .views import CreateAuthToken, CreateUserAPIView, ManageUserView
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
)


urlpatterns = [
    path("api/user/register/",CreateUserAPIView.as_view(), name="create-user"),
    path("api/user/login/", CreateAuthToken.as_view(), name="create-token"),
    
    path('', ManageUserView.as_view(), name='api-schema'),
    path(
        'api/docs/',
        SpectacularSwaggerView.as_view(url_name='api-schema'),
        name='api-docs',
    ),
]