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
<<<<<<< HEAD
    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]
    username = models.CharField(max_length=255, unique=True, db_index=True)
    first_name= models.CharField(max_length=200,null=False,blank=False)
    last_name= models.CharField(max_length=200,null=False,blank=False)
    email = models.EmailField(verbose_name="email address", unique=True)
    phone_1 = models.CharField(max_length=20, null=False, blank=False)
    phone_2 = models.CharField(max_length=20, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    address = models.CharField(max_length=300, blank=True)
    gender = models.CharField(max_length=7, blank=True, choices=GENDER_CHOICES)
    institution = models.CharField(max_length=300, blank=True)
=======
>>>>>>> e356f8e65b8b1980fb6514f37fb82e4cfba1dea9

    USERNAME_FIELD = "email"
    EMAIL_FIELD = "email"
    REQUIRED_FIELDS = []

    email = models.EmailField(verbose_name="email address", unique=True)
    phone = models.CharField(max_length=20)
    created_datetime = models.DateTimeField(auto_now_add=True)
    updated_datetime = models.DateTimeField(auto_now=True)

    objects = UserManager()

    def __str__(self):
        return f'{self.first_name} {self.last_name}'