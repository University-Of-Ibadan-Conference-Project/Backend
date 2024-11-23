from django.urls import path
from event.api.v1.views import (
    AbstractListView,
    ClearanceFileView,
    EventDetailView,
)

urlpatterns = [
    path('event/', EventDetailView.as_view(), name='event'),
    path('abstact/', AbstractListView.as_view(), name='abstract_list'),
    path('clearance/', ClearanceFileView.as_view(), name = 'clearance'), 
]

