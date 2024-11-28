from typing import Any
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager


class UserManager(BaseUserManager):
    """Define a model manager for User model with no username field."""

    use_in_migrations = True

    def _create_user(self, email: str, password: str, **extra_fields: dict[str, Any]) -> models.Model:
        """Create and save a User with the given email and password."""
        if not email:
            raise ValueError("The given email must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email: str, password: str | None = None, **extra_fields: dict[str, Any]) -> models.Model:
        """Create and save a regular User with the given email and password."""
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email: str, password: str, **extra_fields: dict[str, Any]) -> models.Model:
        """Create and save a SuperUser with the given email and password."""
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self._create_user(email, password, **extra_fields)


GENDER_CHOICES = (
    ('M', 'Male'),
    ('F', 'Female'),
)

class User(AbstractUser):
    
    USERNAME_FIELD = "email"
    EMAIL_FIELD = "email"
    REQUIRED_FIELDS = []

    username = None
    email = models.EmailField(verbose_name="email address", unique=True)
    other_names= models.CharField(max_length=200,)
    phone= models.CharField(max_length=20)
    created_datetime = models.DateTimeField(auto_now_add=True)
    updated_datetime = models.DateTimeField(auto_now=True)
    address = models.CharField(max_length=300, blank=True)
    gender = models.CharField(max_length=7, blank=True, choices=GENDER_CHOICES)
    objects = UserManager()

    def __str__(self):
        return f'{self.first_name} {self.last_name}'



class Admin(User):

    class Meta:
        proxy = True
