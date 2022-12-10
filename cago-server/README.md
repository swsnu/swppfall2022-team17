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

## Testing

```bash
coverage run --source="." manage.py test
coverage html
open htmlcov/index.html
```

## Environment Variables

On development or testing, set `$DJANGO_SECRET_KEY` and `$DB_PASSWORD` to whatever you want. You can generate a random Django secret key [here](https://djecrety.ir/). Below are the key-value pairs you need to specify on `cago-server/.env` file.

```bash
MODE=DEVELOPMENT
DJANGO_SECRET_KEY=$DJANGO_SECRET_KEY
DB_HOST="127.0.0.1"
DB_PASSWORD=$DB_PASSWORD
```

## Dependencies

pacman, brew, apt, whatever...

```bash
postgresql@14   # For running development database
postgis         # For using GeoDjango APIs with postgresql
redis           # Local cache server
```

## Development Database

### Running the daemons
```bash
# systemctl
sudo systemctl start postgresql
sudo systemctl start redis

# brew
brew services run postgresql
brew services run redis-server

# service
sudo service postgresql start
sudo service redis-server start

# else, RTFM
```

### Setting up the database

```bash
# Connect to the existing local database.
psql postgres

CREATE DATABASE cago;
CREATE USER postgres WITH PASSWORD '$DB_PASSWORD'; # inlcude the single quotes
ALTER ROLE postgres SUPERUSER;
ALTER ROLE postgres SET client_encoding TO 'utf8';
ALTER ROLE postgres SET TIMEZONE TO 'Asia/Seoul';
GRANT ALL PRIVILEGES ON DATABASE cago TO postgres;
```

## Load testing with Locust

```bash
source .venv/bin/activate
gunicorn cago.wsgi --bind 127.0.0.1:8000 --workers 8
locust -f locustfile.py -H "http://127.0.0.1:8000 -u 3000 -r 300 -t 30s"
```

Visit `http://127.0.0.1:8089`
