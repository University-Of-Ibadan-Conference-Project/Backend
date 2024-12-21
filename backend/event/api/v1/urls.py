from django.urls import path
from event.api.v1.views import (
    AbstractListView,
    ClearanceFileView,
    ContactUsView,
    EventRegistrationView,
)

urlpatterns = [
    path('event/', EventRegistrationView.as_view(), name='event'),
    path('abstact/', AbstractListView.as_view(), name='abstract_list'),
    path('clearance/', ClearanceFileView.as_view(), name = 'clearance'), 
    path('contact-us/', ContactUsView.as_view(), name='contact_us'),
]

