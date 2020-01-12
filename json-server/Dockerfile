FROM node:12.14.1-alpine3.9

WORKDIR /app

RUN npm install -g --production json-server  && \
    rm -rf /root/.npm /usr/lib/node_modules/npm

EXPOSE 8342
