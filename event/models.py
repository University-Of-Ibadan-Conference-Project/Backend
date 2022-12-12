# working no the models
from django.db import models



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

class Event(models.Model):
    author = models.CharField(max_length=250, blank=True)
    topic = models.CharField(max_length=100,  choices=TOPIC_CHOICES)
    abstract = models.FileField(upload_to='uploads/', blank=True)
    submitted = models.DateField(auto_now_add=True)
    phone = models.CharField(max_length=30, blank=True)
    email = models.EmailField(max_length=140, blank=True)
    co_authors = models.CharField(max_length=250, blank=True)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)
    

    def __str__(self):
        return self.author
