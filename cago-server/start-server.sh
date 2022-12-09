#!/bin/bash

python3 manage.py migrate
service redis-server start
nginx
gunicorn cago.wsgi --bind 127.0.0.1:8080 --workers 3