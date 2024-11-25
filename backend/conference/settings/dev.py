from .base import *

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-e$o%*$)jkyw0^$2y56&6124k(^)-ra#91y2#m(g9og@wx_w865'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']

APPEND_SLASH = True

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

CORS_ALLOW_ALL_ORIGINS = True

JAZZMIN_SETTINGS = {
    
    "site_title": "Fassa 2025",
    "site_header": "Fassa 2025 header",
    "site_brand": "Fassa 2025 Conference",
    "hide_apps": ["authtoken"],
    "hide_models": ["auth.Group"],
    "welcome_sign": "Fassa 2025 Conference Admin Dashboard",
    "login_logo": "icons/uisc.png",
    "copyright": "Fassa 2025 Conference",
}


