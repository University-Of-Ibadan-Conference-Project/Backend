from django.urls import path
from event.api.v1.views import (
    AbstractListView,
)

urlpatterns = [
    path('abstact/', AbstractListView.as_view(), name='abstract_list'),
]

