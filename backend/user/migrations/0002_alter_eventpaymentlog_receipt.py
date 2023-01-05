# Generated by Django 4.1.4 on 2023-01-03 22:34

from django.db import migrations, models
import gdstorage.storage


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='eventpaymentlog',
            name='receipt',
            field=models.FileField(storage=gdstorage.storage.GoogleDriveStorage(), upload_to='uploads/'),
        ),
    ]