from django.urls import path
from . import views

urlpatterns = [
    path('', views.EventPaymentLog, name='event-payment-log'),
]