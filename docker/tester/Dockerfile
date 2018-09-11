# Nodejs version used in Lambda
FROM node:8.10

WORKDIR /signal-test

COPY docker/tester/package.json .
RUN  npm install

COPY src/  src/
COPY test/ test/
