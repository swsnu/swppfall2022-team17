"""
WSGI config for cago project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/wsgi/
"""

import os

from decouple import config
from django.core.wsgi import get_wsgi_application

if config("MODE").casefold() == "DEVELOPMENT".casefold():
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "cago.settings.development")
else:
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "cago.settings.production")

application = get_wsgi_application()
