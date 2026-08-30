---
title: "Local Development"
description: "Documentation for local development in the Araru ecosystem."
order: 100
section: "getting-started"
status: stable
---

Clone only the projects you will work on. There is no shared-directory dependency.

## Server

```bash
git clone git@github.com:araruoss/araru-server.git
cd araru-server
cp .env.example .env
docker compose -f docker-compose.dev.yml up -d
npm ci
npm run migrate
npm run dev
```

## Web

In another terminal:

```bash
git clone git@github.com:araruoss/araru-web.git
cd araru-web
cp .env.example .env
npm ci
npm run dev
```

By default, Vite proxies `/api` to `http://localhost:3001`. For another host, change `VITE_API_URL`.

For a complete installation using published images, use the [official Compose file](https://github.com/araruoss/araru-docs/blob/main/examples/docker-compose.yml).
