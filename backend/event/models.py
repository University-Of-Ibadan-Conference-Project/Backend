from django.db import models
from event.bank_choices import BANK_CHOICES
from user.models import User


class UserEvent(models.Model):

    PARTICIPANT_TYPE_CHOICE = (
        ('Physical', 'Physical'),
        ('Virtual', 'Virtual'),
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    affiliate_institution =  models.CharField(blank=True, max_length=300)
    department = models.CharField(blank=True, max_length=300)
    country = models.CharField(blank=True, max_length=300)
    state =  models.CharField(blank=True, max_length=300)
    city =  models.CharField(blank=True, max_length=300)
    address =  models.CharField(blank=True, max_length=300)
    participant_type =  models.CharField(choices=PARTICIPANT_TYPE_CHOICE, max_length=300)
    receipt = models.OneToOneField(to='event.paymentreceipt', on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True, editable=False)
    date_updated = models.DateField(auto_now_add=True)

    def __str__(self):
        return f'Event registration for {self.user}'


class Abstract(models.Model):
    PRESENTATION_TYPE_CHOICES = (
        ('oral', 'Live oral'),
        ('virtual', 'Live Virtual'),
        ('poster', 'Poster'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    coresponding_author_fullname = models.CharField(max_length=200)
    coresponding_author_email = models.EmailField(max_length=140)
    coresponding_author_phone = models.CharField(max_length=140)

    abstract_document_file = models.FileField(upload_to='uploads/', max_length=500)

    presentation_type = models.CharField(choices=PRESENTATION_TYPE_CHOICES, max_length=100)
    research_area = models.CharField(max_length=200)
    keywords= models.JSONField(default=list)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)
    receipt = models.OneToOneField(to='event.paymentreceipt', on_delete=models.CASCADE)
     
    def __str__(self):
        return f"{self.coresponding_author_fullname} Abstract"


class ClearanceFile(models.Model):
    SUBMISSION_TYPE = (
        ('Manuscript', 'Manuscript'),
        ('Exhibition', 'Exhibition'),
        ('Advert', 'Advert'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    submission_type = models.CharField(max_length = 20, choices=SUBMISSION_TYPE)
    submission_file = models.FileField(upload_to='uploads/', null=True, max_length=500)
    receipt = models.OneToOneField(to='event.paymentreceipt', on_delete=models.CASCADE)
    created_at=models.DateTimeField(auto_now_add=True)


class PaymentReceipt(models.Model):
    STATUS_AWAITING_VERIFICATION = 0
    STATUS_VERIFIED = 1
    STATUS_FAILED_VERIFICATION = 2

    STATUS_CHOICES = (
        (STATUS_AWAITING_VERIFICATION, 'Pending verification'),
        (STATUS_VERIFIED, 'Verified'),
        (STATUS_FAILED_VERIFICATION, 'Failed verification'),
    )

    status = models.IntegerField(
        choices=STATUS_CHOICES,
        default=STATUS_AWAITING_VERIFICATION
    )
    payment_proff = models.FileField(upload_to='uploads/receipts/')
    failure_reason = models.CharField(max_length=200, blank=True)
    date_created = models.DateTimeField(auto_now_add=True, editable=False)
    date_updated = models.DateTimeField(auto_now=True, editable=False)
    verification_log = models.OneToOneField(
        'event.ReceiptVerificationLogs', 
        null=True,
        blank=True,
        on_delete=models.CASCADE, 
        related_name="reciept"
    )

    class Meta:
        constraints = [
            models.CheckConstraint(
                check=~models.Q(status=2, failure_reason=''),
                name='failure_reason required for `Failed verification` status',
                violation_error_message='Please add a failure reason when marking a payment reciept status as `Failed verification`'
            ),
            models.CheckConstraint(
                check=~models.Q(status=1, verification_log__isnull=True),
                name='verification_log requireed for `Verified` status',
                violation_error_message='Please ensure to add a reciept verification log when marking a payment reciept status as `Verified`'
            ),
        ]

    def __str__(self):
        return f"Receipt #{self.id} - Status: {self.get_status_display()}"


class ReceiptVerificationLogs(models.Model):
    verified_by = models.ForeignKey(
        User, 
        blank=True, 
        on_delete=models.CASCADE, 
        related_name="verification_logs",
    )
    transaction_id = models.CharField(max_length=200)
    payment_bank = models.CharField(max_length=200, choices=BANK_CHOICES)
    date_created = models.DateTimeField(auto_now_add=True, editable=False)

    class Meta:
        ordering = ['-date_created']
        verbose_name = 'receipt verification log'
        verbose_name_plural = 'receipt verification logs'
        constraints = [
            models.UniqueConstraint(
                fields=['transaction_id', 'payment_bank'],
                name='transaction_id_unique_with_payment_bank',
                violation_error_message=(
                    'A transaction with the specifeid ID already exists in the system. This might be a fraud case.'
                ),
            ),
        ]

    def __str__(self):
        return f"Transaction id: [{self.transaction_id}] Bank: [{self.payment_bank}]"



class UserContactRequest(models.Model):
    """Model represent data collected from contact us page."""

    full_name = models.TextField()
    email = models.EmailField()
    message = models.TextField()
    attachment = models.FileField(upload_to='uploads/contactus/', null=True)
    resolved = models.BooleanField(default=False)
    resolved_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    date_created = models.DateTimeField(auto_now_add=True, editable=False)
    resolution_date = models.DateTimeField(null=True)
