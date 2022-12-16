import os

from celery import Celery
from dotenv import load_dotenv

load_dotenv()


# set the default Django settings module for the 'celery' program.
# this is also used in manage.py
os.getenv("DJANGO_SETTINGS_MODULE", "conference.dev_settings")

# Get the base REDIS URL, default to redis' default
BASE_REDIS_URL = os.environ.get("REDIS_URL", "redis://localhost:6379")

CELERY_APP = Celery("conference")

# Using a string here means the worker don't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.
CELERY_APP.config_from_object("django.conf:settings", namespace="CELERY")

# Load task modules from all registered Django app configs.
CELERY_APP.autodiscover_tasks()

CELERY_APP.conf.broker_url = BASE_REDIS_URL
