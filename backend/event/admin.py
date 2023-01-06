from django.contrib import admin
from event.models import *
from user.models import *

admin.site.register(ClearanceFile)
admin.site.register(Abstract)
admin.site.register(User)
admin.site.register(UserEvent)
admin.site.register(EventPaymentLog)
