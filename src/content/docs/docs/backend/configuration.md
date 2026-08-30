---
title: "Backend Initialization and Configuration"
description: "Documentation for Backend Initialization and Configuration in the Araru ecosystem."
order: 100
section: "backend"
status: stable
---

`config/loadEnv.js` loads the environment; `config/drive.js` normalizes values and paths and validates combinations. `createApp()` loads credentials, validates the environment, and prepares the library before exposing routes.

`server.js` starts HTTP, maintenance tasks, and a watcher, and handles graceful shutdowns. Refer to the [Server `.env.example`](https://github.com/araruoss/araru-server/blob/main/.env.example) for the full list.

## Critical Points

- `DATABASE_URL` is required and must point to PostgreSQL;
- `REDIS_URL` is required when `REDIS_ENABLED=true`; Redis is a cache, not a source of truth;
- in Compose, `DOCKER_DATABASE_URL` and `DOCKER_REDIS_URL` replace internal services; keep them empty to use `postgres` and `redis` from the Docker network;
- `LOCAL_LIBRARY_DIR` and the cache need appropriate permissions;
- the library can be read-only;
- Drive can be disabled without preventing local catalog access;
- `TRUST_PROXY` should reflect the topology;
- rate limiting is disabled by default; enable it with `RATE_LIMIT_ENABLED=true` and adjust `RATE_LIMIT_WINDOW_MS` and `API_RATE_LIMIT_PER_MINUTE` as needed for API exposure;
- CORS uses either an exact origin or the same-host provided by the proxy;
- secrets and tokens should never appear in logs/documentation.

The supported runtime is Node.js 22+. Initialization fails early if PostgreSQL is not configured or accessible.
