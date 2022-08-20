# --- HOW TO USE ---------------
# 1) $ docker build -t ittyurli .
# 2) $ docker run -d -p 8080:8080 -p 8081:8081 -e ITTYURLI_HTTP_SERVER_PREFIX="http://localhost" -e ITTYURLI_HTTP_SERVER_PORTNO=8080 -t ittyurli

#FROM debian:latest
FROM alpine:latest

#RUN apt-get update; apt-get -y upgrade; apt-get -y install nodejs npm redis
RUN apk -U upgrade ; apk add nodejs npm redis

RUN npm install -g npm

RUN npm update -g

RUN npm install -g gulp-cli

WORKDIR /app

COPY . .

RUN npm install

#RUN useradd -m -d /app -s /bin/bash -u 63936 nodejs-user

#RUN chown -R 63936:1000 /app

#USER 63936

CMD ["./run.sh"]
