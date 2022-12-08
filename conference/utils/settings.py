import os
from django.core.exceptions import ImproperlyConfigured


def get_env_variable(var_name, default=None):
    """
    return environment variable otherwise throws
    `django.core.exceptions.ImproperlyConfigured` error
    """
    value = os.getenv(var_name, default)

    if value:
        return value

    error_msg = f"Set the {var_name} environment variable"
    raise ImproperlyConfigured(error_msg)


def get_app_settings():
    """
    set default settings module or get from environment variable
    """
    setting = get_env_variable(
        "DJANGO_SETTINGS_MODULE", "conference.dev_settings"
    )
    return setting