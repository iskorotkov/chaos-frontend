FROM nginx:alpine as base

FROM node:14 as build
WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]
RUN npm i

COPY . .
RUN npm run build

FROM base as run
COPY --from=build /app/build /usr/share/nginx/html/

COPY configs/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
