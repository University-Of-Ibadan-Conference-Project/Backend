from conference.base_settings import *

DEBUG = False

ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', '').split(',')

EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"