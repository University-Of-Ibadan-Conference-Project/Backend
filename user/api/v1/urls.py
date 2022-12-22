from django.urls import path
from user.api.v1.views import (
    UserLoginView,
    UserSignupView,
    UserDetailView,
    EventDetailView,
    ReceiptUploadView,
)

urlpatterns = [
    path('signup/', UserSignupView.as_view(), name='user_signup'),
    path('login/', UserLoginView.as_view(), name='user_login'),
    path('me/', UserDetailView.as_view(), name='user_details'),
    path('me/event/', EventDetailView.as_view(), name='user_event'),
    path('me/event/payment/', ReceiptUploadView.as_view(), name='payment_upload'),
]