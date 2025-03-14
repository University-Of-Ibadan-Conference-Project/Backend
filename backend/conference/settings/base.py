"""
Django settings for conference project.

Generated by 'django-admin startproject' using Django 4.1.4.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.1/ref/settings/
"""

import os
from pathlib import Path
from dotenv import load_dotenv


# Build paths inside the project like this: BASE_DIR / 'subdir'.
PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent.parent
BASE_DIR = Path(__file__).resolve().parent.parent.parent
FRONTEND_PROJECT_DIR = PROJECT_ROOT / 'frontend'

loaded = load_dotenv(
    dotenv_path=PROJECT_ROOT / '.env', 
    verbose=True, 
    override=True,
)

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.1/howto/deployment/checklist/

# Application definition

INSTALLED_APPS = [
    'jazzmin',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # 3rd party apps
    'rest_framework',
    'rest_framework.authtoken',
    'corsheaders',

    # custom apps
    'user',
    'event',
    'lib',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    # 'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'conference.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            FRONTEND_PROJECT_DIR / 'build',
            BASE_DIR / 'templates',
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                # 'lib.context_processors.reactjs_assets_paths',
            ],
        },
    },
]

WSGI_APPLICATION = 'conference.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10,
    'NON_FIELD_ERRORS_KEY': 'errors',
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ],
}

# SHOW_API_DOCS
SHOW_API_DOCS = os.getenv('SHOW_API_DOCS', 'False').lower() == 'true'
SWAGGER_SETTINGS = {
    'SECURITY_DEFINITIONS': {
        'Token': {
            'type': 'apiKey',
            'name': 'Authorization',
            'in': 'header'
        }
    }
}

if SHOW_API_DOCS:
    INSTALLED_APPS += ['drf_yasg']

AUTH_USER_MODEL = "user.User" 

# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / "staticfiles"
REACT_APP_BUILD_PATH = FRONTEND_PROJECT_DIR / 'build/static'
STATICFILES_DIRS = [REACT_APP_BUILD_PATH]

# Media

MEDIA_URL = '/backend/'
MEDIA_ROOT = BASE_DIR

# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# EMAIL SETTINGS
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_USE_TLS = True
EMAIL_PORT = os.getenv("EMAIL_PORT", 587)
EMAIL_HOST = os.getenv("EMAIL_HOST", "smtp.gmail.com")
EMAIL_HOST_PASSWORD = os.getenv("EMAIL_HOST_PASSWORD", "111111")
EMAIL_HOST_USER = os.getenv("EMAIL_HOST_USER", "info@example.com")
EMAIL_HOST_DOMAIN = os.getenv('EMAIL_HOST_DOMAIN', 'example.com')

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

FRONTENT_URL = os.getenv(
    "FRONTENT_URL", 
    "http://127.0.0.1:8000",
)
