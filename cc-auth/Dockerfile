FROM node:12-alpine

COPY . /app/
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
RUN yarn

EXPOSE 8341
