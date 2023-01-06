from conference.base_settings import *

DEBUG = False

SECRET_KEY = os.getenv('DJANGO_SECRET_KEY')

ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', '').split(',')

EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"

CSRF_TRUSTED_ORIGINS = [
    'http://*.uisc2023.org',
    'http://*52.6.64.184',
    'https://*.uisc2023.org',
    'http://*uisc2023.org:8000',
    'https://*uisc2023.org:8000'
]

# AWS SETTINGS
DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
AWS_ACCESS_KEY_ID = os.environ.get("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.environ.get("AWS_SECRET_ACCESS_KEY")
AWS_STORAGE_BUCKET_NAME = os.environ.get("AWS_STORAGE_BUCKET_NAME")
AWS_QUERYSTRING_AUTH = False
