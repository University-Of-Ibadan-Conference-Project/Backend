from django.contrib import admin
from event.models import *
from user.models import *

admin.site.register(UserEvent)


@admin.register(Abstract)
class AbstractAdmin(admin.ModelAdmin):
    list_display = ('title', 'coresponding_author_fullname', 'created_at')
    date_hierarchy = 'created_at'


@admin.register(ClearanceFile)
class ClearanceFileAdmin(admin.ModelAdmin):
    list_display = ('submission_type', 'created_at')
    date_hierarchy = 'created_at'

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'first_name', 'last_name', 'created_datetime')
    date_hierarchy = 'created_datetime'

@admin.register(PaymentReceipt)
class PaymentReceiptAdmin(admin.ModelAdmin):
    list_display = ('status', 'payment_proff', 'failure_reason', 'date_created')
    date_hierarchy = 'date_created'


@admin.register(UserContactRequest)
class UserContactRequestAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email', 'message', 'attachment', 'resolved', 'resolved_by', 'date_created', 'resolution_date')
    date_hierarchy ='date_created'