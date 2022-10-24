FROM python:3.10-buster
WORKDIR /usr/src/cago-server

RUN apt-get update && apt-get install --no-install-recommends -y nginx

COPY nginx.default /etc/nginx/sites-available/default
RUN ln -sf /dev/stdout /var/log/nginx/access.log  && ln -sf /dev/stderr /var/log/nginx/error.log

COPY . .
RUN pip install --upgrade pip && pip install -r requirements.txt

EXPOSE 8000
STOPSIGNAL SIGTERM
CMD ["./start-server.sh"]