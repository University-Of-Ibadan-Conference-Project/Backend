# Generated by Django 4.1.4 on 2023-02-20 17:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0006_alter_abstract_abstract_document_file'),
    ]

    operations = [
        migrations.AlterField(
            model_name='abstract',
            name='coresponding_author_email',
            field=models.EmailField(max_length=140),
        ),
        migrations.AlterField(
            model_name='abstract',
            name='coresponding_author_phone',
            field=models.CharField(max_length=140),
        ),
        migrations.AlterField(
            model_name='abstract',
            name='title',
            field=models.CharField(default='No DATA WAS ADDED HERE. BEFORE THE FIX', max_length=200),
            preserve_default=False,
        ),
    ]
