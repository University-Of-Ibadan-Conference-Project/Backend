from django.contrib import admin
from .models import Event, EventPaymentLog, Abstract, UserEvent

admin.site.register(Event)
admin.site.register(EventPaymentLog)
admin.site.register(Abstract)
admin.site.register(UserEvent)

# Register your models here.
