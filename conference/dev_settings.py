from .base_settings import *

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-e$o%*$)jkyw0^$2y56&6124k(^)-ra#91y2#m(g9og@wx_w865'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

APPEND_SLASH = True

CSRF_TRUSTED_ORIGINS = ["http://*"]

STATIC_URL = '/static/'


INTERNAL_IPS = [
    "127.0.0.1",
]