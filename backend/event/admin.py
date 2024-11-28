from django.contrib import admin
from django.utils import timezone
from user.models import User, Admin
from event.models import (
    Abstract, 
    UserEvent,
    ClearanceFile, 
    PaymentReceipt, 
    UserContactRequest, 
    ReceiptVerificationLogs, 
)


@admin.register(UserEvent)
class UserEventAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'participant_type', 'affiliate_institution')
    date_hierarchy = 'date_created'

    def has_change_permission(self, request, obj=None):
        # make all fields read only
        return False


@admin.register(Abstract)
class AbstractAdmin(admin.ModelAdmin):
    list_display = ('title', 'coresponding_author_fullname', 'created_at')
    date_hierarchy = 'created_at'

    def has_change_permission(self, request, obj=None):
        # make all fields read only
        return False


@admin.register(ClearanceFile)
class ClearanceFileAdmin(admin.ModelAdmin):
    list_display = ('submission_type', 'created_at')
    date_hierarchy = 'created_at'

    def has_change_permission(self, request, obj=None):
        # make all fields read only
        return False


@admin.register(PaymentReceipt)
class PaymentReceiptAdmin(admin.ModelAdmin):
    list_display = (
        'status',
        'payment_proff', 
        'date_created',
    )
    readonly_fields = ['payment_proff']
    date_hierarchy = 'date_created'


@admin.register(UserContactRequest)
class UserContactRequestAdmin(admin.ModelAdmin):
    list_display = (
        'full_name', 
        'email', 
        'message', 
        'attachment', 
        'resolved', 
        'resolved_by', 
        'date_created', 
        'resolution_date',
    )

    readonly_fields = [
        'resolved_by', 
        'resolution_date',
        'attachment',
        'message',
        'email',
        'full_name',
    ]
    date_hierarchy ='date_created'

    def save_model(self, request, obj, form, change):
        obj.resolved_by = request.user
        obj.resolution_date = timezone.now()
        super().save_model(request, obj, form, change)


@admin.register(ReceiptVerificationLogs)
class ReceiptVerificationLogsAdmin(admin.ModelAdmin):
    fields = [
        'verified_by',
        'transaction_id',
        'payment_bank',
        'date_created',
    ]
    readonly_fields = ['verified_by', 'date_created']
    date_hierarchy ='date_created'

    def save_model(self, request, obj, form, change):
        obj.verified_by = request.user
        super().save_model(request, obj, form, change)


@admin.register(Admin)
class StaffAdmin(admin.ModelAdmin):
    list_display = ('email', 'first_name', 'last_name', 'created_datetime')
    date_hierarchy = 'created_datetime'

    def get_queryset(self, request):
        return super().get_queryset(request).filter(is_staff=True)


@admin.register(User)
class ParticipantAdmin(admin.ModelAdmin):
    list_display = ('email', 'first_name', 'last_name', 'created_datetime')
    date_hierarchy = 'created_datetime'
    fields = [
        'email',
        'first_name',
        'last_name',
        'other_names',
        'address',
        'gender',
    ]
    readonly_fields = fields

    def get_queryset(self, request):
        return super().get_queryset(request).filter(is_staff=False)

