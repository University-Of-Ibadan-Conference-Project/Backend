from django.urls import path
from event.api.v1.views import (
    AbstractListView,
    ClearanceFileView,
    
)

urlpatterns = [
    path('abstact/', AbstractListView.as_view(), name='abstract_list'),
    path('clearance/', ClearanceFileView.as_view(), name = 'clearance'),
    
]

