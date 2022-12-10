from decouple import config

from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

# TEMP
ALLOWED_HOSTS = ["*"]


SECURE_COOKIE = True

CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": "redis://cago-server-cache-redis.2ct0me.ng.0001.apn2.cache.amazonaws.com:6379",
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
        },
    }
}
