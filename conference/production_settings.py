from conference.base_settings import *

DEBUG = False

SECRET_KEY = os.getenv('DJANGO_SECRET_KEY')

ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', '').split(',')

EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"