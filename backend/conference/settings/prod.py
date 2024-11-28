from .base import *
import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration
from sentry_sdk.integrations.logging import LoggingIntegration
import logging


DEBUG = True

SECRET_KEY = os.getenv('DJANGO_SECRET_KEY')
ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', '').split(',')
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
CSRF_TRUSTED_ORIGINS = []
MIDDLEWARE += ['whitenoise.middleware.WhiteNoiseMiddleware']


# # MEDIA FILE SETTINGS
DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'
# configure cloudinary
import cloudinary
CLOUDINARY__BUCKET_NAME =  os.getenv('CLOUDINARY_BUCKET_NAME')
CLOUDINARY__API_KEY  = os.getenv('CLOUDINARY_API_KEY')
CLOUDINARY__API_SECRET = os.getenv('CLOUDINARY_API_SECRET')
CLOUDINARY__API_PROXY = os.getenv('CLOUDINARY_API_PROXY')

cloudinary.config(
    cloud_name = CLOUDINARY__BUCKET_NAME,
    api_key = CLOUDINARY__API_KEY,
    api_secret = CLOUDINARY__API_SECRET,
    # api_proxy = CLOUDINARY__API_PROXY,
)

CLOUDINARY_STORAGE = {
    'CLOUD_NAME': CLOUDINARY__BUCKET_NAME,
    'API_SECRET': CLOUDINARY__API_SECRET,
    'API_KEY': CLOUDINARY__API_KEY,
    # 'API_PROXY': CLOUDINARY__API_PROXY,
}


# CONFIGURE SENTRY
sentry_logging = LoggingIntegration(
    level=logging.INFO,        # Capture info and above as breadcrumbs
    event_level=logging.ERROR  # Send errors as events
)

sentry_sdk.init(
    dsn=os.getenv('SENTRY_DSN'),
    integrations=[
        DjangoIntegration(),
        sentry_logging,
    ],

    # Set traces_sample_rate to 1.0 to capture 100%
    # of transactions for performance monitoring.
    # We recommend adjusting this value in production.
    traces_sample_rate=1.0,

    # If you wish to associate users to errors (assuming you are using
    # django.contrib.auth) you may enable sending PII data.
    send_default_pii=True
)
