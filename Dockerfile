FROM node:16.13.0-slim as build
WORKDIR /dist/src/app
RUN npm i -g npm@8.9.0

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


FROM nginx:latest as ngx
COPY --from=build /dist/src/app/dist/frontend /usr/share/nginx/html
COPY /nginx.conf /etc/nginx.conf.d/default.conf
EXPOSE 80
