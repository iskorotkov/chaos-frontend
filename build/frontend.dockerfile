FROM nginx:1.21-alpine as base

FROM node:16.12-alpine as build
WORKDIR /app

RUN npm i -g pnpm

COPY ["package.json", "pnpm-lock.yaml", "./"]
RUN pnpm i

COPY . .
RUN pnpm build

FROM base as run
COPY --from=build /app/build /usr/share/nginx/html/

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
