FROM node:12-alpine

WORKDIR /app

RUN npm install -g --production json-server  && \
    rm -rf /root/.npm /usr/lib/node_modules/npm

EXPOSE 3000
