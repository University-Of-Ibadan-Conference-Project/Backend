# working no the models
from django.db import models
# from django.contrib.auth.models import AbstractUser, BaseUserManager
from ckeditor_uploader.fields import RichTextUploadingField
from user.models import User

TOPIC_CHOICES = (
    ('Bio', 'Biotechnology'),
    ('Medicine', 'Medicinal plants and drug development'),
    ('Conservation', 'Conservation and utilization of our natural heritage'),
    ('Energy', 'Energy and Mineral Resources'),
    ('Environmental', 'Environmental Pollution and Remediation'),
    ('Science', 'Science and security'),
    ('IT', 'Information technology'),
    ('Agriculture', 'Agriculture and Food Security'),
    ('Nanotech', 'Nanotechnology'),
    ('Computational', 'Computational/Mathematical modeling'),
    ('Aquaculture', 'Aquaculture and the Blue Economy '),
)

STATUS_CHOICES = (
    ('Pending', 'Pending'),
    ('Verified', 'Verified'),
    ('Not verified', 'Not verified'),
)

class Event(models.Model):
    description = models.CharField(max_length=500, blank=True)
    date_created = models.DateTimeField(auto_now_add=True, editable=False, blank=True)
    date_updated = models.DateField(auto_now_add=True, blank=True)
    status = models.CharField(max_length=200,blank=True)
    event_datetime = models.DateField(auto_now_add=True)
    location = models.CharField(max_length=500, blank=True)

    def __str__(self):
        return self.description


class CoAuthor(models.Model):
    name = models.CharField(max_length=200, blank=True)
    institution = models.CharField(max_length = 300, blank=True)



class UserEvent(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True, blank=True, editable=False)
    date_updated = models.DateField(auto_now_add=True, blank=True)
    submitted = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=200, blank=True)
    

    def __str__(self):
        return self.user



class EventPaymentLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    user_event = models.OneToOneField(Event, on_delete=models.CASCADE, primary_key=True)
    date_created = models.DateTimeField(auto_now_add=True, blank=True, editable=False)
    date_updated = models.DateField(auto_now_add=True, blank=True)
    payment_datetime = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=100,  choices=STATUS_CHOICES)
    receipt = models.FileField(upload_to='uploads/', blank=True)

    def __str__(self):
        return self.user

class Abstract(models.Model):
    author = models.ForeignKey(User('username'), on_delete=models.CASCADE)
    author_email = models.EmailField(max_length=140, blank=True)
    keywords = models.CharField(max_length=100,  choices=TOPIC_CHOICES)
    co_authors = models.ManyToManyField(CoAuthor)
    abstract = models.FileField(upload_to='uploads/', blank=True, editable=False)

    def __str__(self):
        return self.author
