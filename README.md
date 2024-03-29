# Chaos Frontend

It's a frontend for Chaos Framework — a resilience testing platform. This web app allows you to generate, preview, execute and monitor chaos tests.

- [Chaos Frontend](#chaos-frontend)
  - [Structure](#structure)
  - [Config](#config)

## Structure

- /src — all source files
  - /lib - common files used across entire project
  - /workflows - workflow-specific files

## Config

It's a React app served by NGINX. NGINX config is provided by a Kubernetes ConfigMap to allow fast development cycles.

NGINX passes all API calls to [Chaos Scheduler](https://github.com/iskorotkov/chaos-scheduler) and [Chaos Workflows](https://github.com/iskorotkov/chaos-workflows).
