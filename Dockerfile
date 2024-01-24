FROM node:alpine3.18 AS builder

WORKDIR /app

COPY . .
RUN npm install yarn
RUN yarn
RUN yarn build


FROM nginx:latest

COPY --from=builder /app/dist /usr/share/nginx/html
COPY config/nginx.conf /etc/nginx/conf.d/

RUN rm /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html
