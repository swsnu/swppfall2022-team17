from decouple import config

from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

# TEMP
ALLOWED_HOSTS = ["*"]

# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "cago",
        "USER": "postgres",
        "PASSWORD": config("DB_PASSWORD"),
        "HOST": "cago-database.cf6av8nj1vlu.ap-northeast-2.rds.amazonaws.com",
        "PORT": "5432",
    }
}
