# Generated by Django 4.1.4 on 2023-01-05 16:50

from django.db import migrations, models
import gdstorage.storage


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0005_alter_clearancefile_submission_file'),
    ]

    operations = [
        migrations.AlterField(
            model_name='abstract',
            name='abstract_document_file',
            field=models.FileField(storage=gdstorage.storage.GoogleDriveStorage(), upload_to='uploads/'),
        ),
    ]
