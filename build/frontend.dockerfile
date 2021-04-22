FROM nginx:1.20-alpine as base

FROM node:14 as build
WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]
RUN yarn install --immutable

COPY . .
RUN yarn run build

FROM base as run
COPY --from=build /app/build /usr/share/nginx/html/

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
