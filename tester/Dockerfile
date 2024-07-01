FROM node:21-alpine3.20

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm ci --verbose

COPY ./index.mjs .

CMD npm start
