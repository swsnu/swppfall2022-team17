# Cago server

## Getting Started

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
python3 manage.py migrate
```

## Environment Variables

```bash
echo MODE=DEVELOPMENT >> .env
echo DJANGO_SECRET_KEY=$DJANGO_SECRET_KEY >> .env

# Not required on development.
echo DB_PASSWORD=$DB_PASSWORD >> .env
echo DB_HOST=$DB_HOST >> .env
```