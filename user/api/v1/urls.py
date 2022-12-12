from django.urls import path
from user.api.v1.views import (
    UserLoginView,
    UserSignupView,
    UserDetailView,
)

urlpatterns = [
    path('signup/', UserSignupView.as_view(), name='user_signup'),
    path('login/', UserLoginView.as_view(), name='user_login'),
    path('me/', UserDetailView.as_view(), name='user_details'),
]