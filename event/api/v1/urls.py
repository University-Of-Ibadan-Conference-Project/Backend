from django.urls import path
from event.api.v1.views import (
    AbstractListView,
    AbstarctDetailView,
)

urlpatterns = [
    path('abstact/', AbstractListView.as_view(), name='abstract_list'),
    path('abstact/<str:id>/', AbstarctDetailView.as_view(), name='abstract_details'),
]

