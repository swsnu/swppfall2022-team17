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
```

## Development Database

### Running and checking postgresql daemon
```bash
# systemctl
sudo systemctl start postgresql
sudo systemctl status postgresql

# brew
brew services run postgresql
brew services info postgresql

# service
sudo service postgresql start
sudo service postgresql status

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

