# Generated by Django 4.1.4 on 2024-11-26 22:11

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("event", "0001_initial"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name="userevent",
            name="user",
            field=models.OneToOneField(
                on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL
            ),
        ),
        migrations.AddField(
            model_name="usercontactrequest",
            name="resolved_by",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AddField(
            model_name="receiptverificationlogs",
            name="verified_by",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="verification_logs",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AddField(
            model_name="paymentreceipt",
            name="verification_log",
            field=models.OneToOneField(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="reciept",
                to="event.receiptverificationlogs",
            ),
        ),
        migrations.AddField(
            model_name="clearancefile",
            name="receipt",
            field=models.OneToOneField(
                on_delete=django.db.models.deletion.CASCADE, to="event.paymentreceipt"
            ),
        ),
        migrations.AddField(
            model_name="clearancefile",
            name="user",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL
            ),
        ),
        migrations.AddField(
            model_name="abstract",
            name="receipt",
            field=models.OneToOneField(
                on_delete=django.db.models.deletion.CASCADE, to="event.paymentreceipt"
            ),
        ),
        migrations.AddField(
            model_name="abstract",
            name="user",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL
            ),
        ),
        migrations.AddConstraint(
            model_name="receiptverificationlogs",
            constraint=models.UniqueConstraint(
                fields=("transaction_id", "payment_bank"),
                name="transaction_id_unique_with_payment_bank",
                violation_error_message="A transaction with the specifeid ID already exists in the system. This might be a fraud case.",
            ),
        ),
        migrations.AddConstraint(
            model_name="paymentreceipt",
            constraint=models.CheckConstraint(
                check=models.Q(("failure_reason", ""), ("status", 2), _negated=True),
                name="failure_reason required for `Failed verification` status",
                violation_error_message="Please add a failure reason when marking a payment reciept status as `Failed verification`",
            ),
        ),
        migrations.AddConstraint(
            model_name="paymentreceipt",
            constraint=models.CheckConstraint(
                check=models.Q(
                    ("status", 1), ("verification_log__isnull", True), _negated=True
                ),
                name="verification_log requireed for `Verified` status",
                violation_error_message="Please ensure to add a reciept verification log when marking a payment reciept status as `Verified`",
            ),
        ),
    ]
