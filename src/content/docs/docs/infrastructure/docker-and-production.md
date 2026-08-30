---
title: "Docker, Networking, and Production"
description: "Documentation for Docker, networking, and production in the Araru ecosystem."
order: 100
section: "infrastructure"
status: stable
---

## Current Compose setup

```mermaid
flowchart LR
  H[Host/browser] -->|8080| N[frontend: Nginx]
  N -->|Docker DNS :3001| B[backend: Node]
  H -. diagnostics .->|3001| B
  B --> P[(PostgreSQL :5432)]
  B --> R[(Redis :6379)]
  B -->|read-only| L[(./storage/pdfs → /library)]
  B --> D[(./storage → /data)]
  B --> C[(./storage/cache → /cache)]
```

The [`araru-web`](https://github.com/araruoss/araru-web) `Dockerfile` performs a multi-stage build with Node 22 and serves `dist` through Nginx. [`araru-server`](https://github.com/araruoss/araru-server) uses Node 22 Alpine and installs the required reading tools. The [official Compose file](https://github.com/araruoss/araru-docs/blob/main/examples/docker-compose.yml) uses published images and does not depend on a shared build context.

```bash
docker compose up -d --build --wait
docker compose ps
docker compose logs -f frontend backend
docker compose down
```

Frontend `8080`; backend `3001`. The interface must never be opened on `3001`.

## Same-origin and cross-origin

Compose uses `/api` on the same host and Nginx resolves `backend:3001`. In a separate deployment, `VITE_API_URL` must be absolute, the backend must allow the exact origin, and cookies/CSP must accept the topology. Range and exposed headers must pass through the proxy.

## External proxy/TLS

`deploy/Caddyfile` forwards the frontend and API between containers. `deploy/nginx.conf` is an example for a static frontend/local API. They are optional alternatives, not two active proxies in Compose.

In production configure the domain, TLS, `TRUST_PROXY`, origins, OAuth redirect, `SECURE_COOKIES`, and backups. PWA and secure cookies require HTTPS outside localhost.

`DATABASE_URL` and `REDIS_URL` are used when running the backend directly on the host. In Docker Compose, use `DOCKER_DATABASE_URL` and `DOCKER_REDIS_URL` only for external databases; when absent, the backend uses the `postgres` and `redis` services on the internal network.

## Persistence

Do not remove `storage` or the `postgres_data` and `redis_data` volumes during an upgrade. The library may be mounted read-only; derived files need write access. Back up and verify before restoring. PostgreSQL and Redis may be external through `DATABASE_URL` and `REDIS_URL`.
