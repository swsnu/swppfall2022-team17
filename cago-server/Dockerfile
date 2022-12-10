FROM python:3.10-buster
WORKDIR /usr/src/cago-server

RUN apt update && apt upgrade -y
RUN apt install --no-install-recommends -y nginx postgis

COPY nginx.default /etc/nginx/sites-available/default
RUN ln -sf /dev/stdout /var/log/nginx/access.log  && ln -sf /dev/stderr /var/log/nginx/error.log

COPY . .
RUN pip install --upgrade pip && pip install -r requirements.txt
RUN python3 manage.py collectstatic --noinput

EXPOSE 8000

CMD ["./start-server.sh"]
