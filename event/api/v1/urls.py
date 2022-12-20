from django.urls import path
from event.api.v1.views import (
    AbstractListView,
    AbstarctDetailView,
    EventPaymentLogView
)

urlpatterns = [
    path('abstact/', AbstractListView.as_view(), name='abstract_list'),
    path('abstact/<str:id>/', AbstarctDetailView.as_view(), name='abstract_details'),
    path('paymentlog/',EventPaymentLogView.as_view(), name="event-log")
]

