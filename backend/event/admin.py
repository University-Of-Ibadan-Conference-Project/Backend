from django.contrib import admin
from event.models import *
from user.models import *

admin.site.register(UserEvent)
admin.site.register(EventPaymentLog)


@admin.register(Abstract)
class AbstractAdmin(admin.ModelAdmin):
    list_display = ('title', 'coresponding_author_fullname', 'created_at')
    date_hierarchy = 'created_at'


@admin.register(ClearanceFile)
class ClearanceFileAdmin(admin.ModelAdmin):
    list_display = ('email', 'submission_type', 'created_at')
    date_hierarchy = 'created_at'

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'first_name', 'last_name', 'created_datetime')
    date_hierarchy = 'created_datetime'