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

    title = models.CharField(max_length=200,null=True)
    coresponding_author = models.ForeignKey(User, on_delete=models.CASCADE)
    coresponding_author_email = models.EmailField(max_length=140, blank=True)
    coresponding_author_phone = models.EmailField(max_length=140, blank=True)
    abstract_document_file = models.FileField(upload_to='uploads/', blank=True, editable=False)
    abstract_text=models.TextField(blank=True)
    research_area = models.CharField(choices=RESEARCH_AREA_CHOICES, max_length=200)
    keywords= models.JSONField(default=list)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.author
