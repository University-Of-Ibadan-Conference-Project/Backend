# working no the models
from django.db import models

# from django.contrib.auth.models import AbstractUser, BaseUserManager
from user.models import User


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


class UserEvent(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True, blank=True, editable=False)
    date_updated = models.DateField(auto_now_add=True, blank=True)
    submitted = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=200, blank=True)
    
    
    def __str__(self):
        return self.event.description 


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
    title = models.CharField(max_length=200,null=True)
    coresponding_author = models.ForeignKey(User, on_delete=models.CASCADE)
    coresponding_author_email = models.EmailField(max_length=140, blank=True)
    co_authors = models.JSONField(default=list)
    abstract_document_file = models.FileField(upload_to='uploads/', blank=True, editable=False)
    abstract_text=models.TextField(blank=True)
    research_area = models.CharField(max_length=999,default=None)
    keywords= models.JSONField(default=list)
    coresponding_author_phone = models.CharField(max_length=30,default=000)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)


    def __str__(self):
        return self.author
