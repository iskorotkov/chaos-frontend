FROM nginx:alpine as base

FROM node:16-alpine as build
WORKDIR /app

COPY ["package.json", "pnpm-lock.yaml", "./"]
RUN npm install --global pnpm && pnpm ci

COPY . .
RUN pnpm run build

FROM base as run
COPY --from=build /app/build /usr/share/nginx/html/

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
