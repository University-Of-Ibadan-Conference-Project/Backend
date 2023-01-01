from django.db import models
from user.models import User


class Abstract(models.Model):
    RESEARCH_AREA_CHOICES = (
        ('Bio', 'Biotechnology, Bioinformatics and Cheminformatics'),
        ('Medicine', 'Medicinal plants and drug development'),
        ('Conservation', 'Conservation and utilization of our natural heritage/ resources'),
        ('Energy', 'Energy and Mineral Resources'),
        ('Environmental', 'Environmental Pollution and Remediation'),
        ('Science', 'Science and security'),
        ('IT', 'Information technology'),
        ('Agriculture', 'Agriculture and Food Security'),
        ('Nanotech', 'Nanotechnology'),
        ('Computational', 'Computational/Mathematical modeling'),
        ('Aquaculture', 'Aquaculture and the Blue Economy '),
        ('Health', 'Climatic change and human health'),
    )

    PRESENTATION_TYPE_CHOICES = (
        ('oral', 'Live oral'),
        ('virtual', 'Live Virtual'),
        ('poster', 'Poster'),
    )
    

    title = models.CharField(max_length=200,null=True)
    coresponding_author_fullname = models.CharField(max_length=200)
    coresponding_author_email = models.EmailField(max_length=140, blank=True)
    coresponding_author_phone = models.CharField(max_length=140, blank=True)
    abstract_document_file = models.FileField(upload_to='uploads/', blank=True, editable=False)
    presentation_type = models.CharField(choices=PRESENTATION_TYPE_CHOICES, max_length=100)
    research_area = models.CharField(choices=RESEARCH_AREA_CHOICES, max_length=200)
    keywords= models.JSONField(default=list)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.author


class ClearanceFile(models.Model):
    SUBMISSION_TYPE = (
    ('Manuscript', 'Manuscript'),
    ('Exhibition', 'Exhibition'),
    ('Advert', 'Advert')
)
    email = models.EmailField(verbose_name="email address")
    submission_type = models.CharField(max_length = 20, choices = SUBMISSION_TYPE)
    evidence_of_payment_file = models.FileField(upload_to='uploads/', blank = False)
    submission_file = models.FileField(upload_to='uploads/', blank = True)
    created_at=models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.email
