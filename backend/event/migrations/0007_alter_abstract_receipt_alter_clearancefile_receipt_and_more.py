# Generated by Django 4.1.4 on 2025-03-13 20:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0006_remove_receiptverificationlogs_verified_by_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='abstract',
            name='receipt',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='abstract', to='event.paymentreceipt'),
        ),
        migrations.AlterField(
            model_name='clearancefile',
            name='receipt',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='clearance_file', to='event.paymentreceipt'),
        ),
        migrations.AlterField(
            model_name='userevent',
            name='receipt',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='userevent', to='event.paymentreceipt'),
        ),
    ]
