from django.urls import path
from event.views import *


urlpatterns = [
    path('user-event/', UserEvent.as_view(), name = "user-event")
]