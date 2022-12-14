from django.contrib import admin
from .models import Event, EventPaymentLog, Abstract, UserEvent, CoAuthor

admin.site.register(Event)
admin.site.register(EventPaymentLog)
admin.site.register(Abstract)
admin.site.register(UserEvent)
admin.site.register(CoAuthor)

# Register your models here.
