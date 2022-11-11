# Cago server

## Getting Started

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
python3 manage.py migrate
python3 manage.py runserver
```

## Environment Variables

```bash
echo MODE=DEVELOPMENT >> .env
echo DJANGO_SECRET_KEY=$DJANGO_SECRET_KEY >> .env

# Not required on development.
echo DB_PASSWORD=$DB_PASSWORD >> .env
echo DB_HOST=$DB_HOST >> .env
```

## Testing

```bash
coverage run --source="." manage.py test
coverage html
open htmlcov/index.html
```