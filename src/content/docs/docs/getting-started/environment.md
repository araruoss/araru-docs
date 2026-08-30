---
title: "Configuration reference"
description: "How to configure Araru Server, Web, databases, security, and storage."
order: 100
section: "getting-started"
status: stable
---

Araru runs from separate repositories. Configure `araru-server` and `araru-web` independently; they do not need a shared working directory.

## Quick start

```bash
cd araru-server
cp .env.example .env
npm ci
npm run migrate
npm run dev
```

In a second terminal:

```bash
cd araru-web
cp .env.example .env
npm ci
npm run dev
```

The server reads `.env` from its repository root. Relative paths are resolved from that root. The complete, source-of-truth list of names is [`araru-server/.env.example`](https://github.com/araruoss/araru-server/blob/main/.env.example).

## Required baseline

```dotenv
NODE_ENV=development
PORT=3001
DATABASE_URL=postgres://araru:password@localhost:5432/araru
REDIS_ENABLED=true
REDIS_URL=redis://localhost:6379
FRONTEND_URL=http://localhost:5173
PUBLIC_BACKEND_URL=http://localhost:3001
ALLOWED_ORIGINS=http://localhost:5173
APP_ACCESS_SECRET=replace-with-a-long-random-secret
```

PostgreSQL is the source of truth for catalog, users, reading state, and provider metadata. Redis is optional cache/coordination and must not be treated as durable data.

## Parameter groups

### Network and database

| Variable | Default | Description |
| --- | --- | --- |
| `NODE_ENV` | `development` | Runtime mode. |
| `PORT` | `3001` | HTTP port. |
| `DATABASE_URL` | — | PostgreSQL URL; required for normal operation. |
| `DATABASE_SSL` | `false` | PostgreSQL TLS. |
| `DATABASE_POOL_MAX` | `10` | Maximum database pool size. |
| `DATABASE_IDLE_TIMEOUT_MS` | `30000` | Idle connection timeout. |
| `DATABASE_CONNECTION_TIMEOUT_MS` | `5000` | Connection timeout. |
| `REDIS_ENABLED` | `true` | Enable Redis. |
| `REDIS_URL` | — | Redis URL when enabled. |
| `REDIS_KEY_PREFIX` | `araru:` | Redis key namespace. |
| `FRONTEND_URL` | `http://localhost:5173` | Canonical frontend URL. |
| `PUBLIC_BACKEND_URL` | `http://localhost:<PORT>` | Public API URL for generated links. |
| `ALLOWED_ORIGINS` | `FRONTEND_URL` | Exact comma-separated CORS origins. |

### Files and jobs

| Variable | Default | Description |
| --- | --- | --- |
| `DATA_DIR` | `storage` | Persistent server data directory. |
| `LOCAL_LIBRARY_DIR` | `storage/pdfs` | Local library directory. |
| `COVER_CACHE_DIR` | `storage/cache/covers` | Regenerable cover cache. |
| `DRIVE_FOLDERS_CONFIG` | `storage/drive-folders.json` | Drive folder/category mapping. |
| `MANUAL_CATEGORIAS_PATH` | `storage/categorias.json` | Manual metadata overrides. |
| `LOCAL_FILES_ROUTE` | `/arquivos` | Local resource route prefix. |
| `LIBRARY_WATCH_ENABLED` | `true` | Watch local library changes. |
| `LIBRARY_WATCH_DEBOUNCE_MS` | `1200` | Watcher debounce. |
| `JOBS_ENABLED` | `true` | Enable scheduled jobs. |
| `CATALOG_REFRESH_INTERVAL_MINUTES` | `60` | Catalog refresh interval. |
| `MAINTENANCE_INTERVAL_MINUTES` | `1440` | Maintenance interval. |
| `CATALOG_MISSING_RETENTION_DAYS` | `30` | Missing-row retention. |

### Google Drive

| Variable | Default | Description |
| --- | --- | --- |
| `ENABLE_GOOGLE_DRIVE` | `true` | Enable Drive integration. |
| `GOOGLE_API_KEY` | empty | Public-resource/API-key access. |
| `GOOGLE_CLIENT_ID` | empty | OAuth client ID. |
| `GOOGLE_CLIENT_SECRET` | empty | OAuth client secret. |
| `GOOGLE_REDIRECT_URI` | `http://localhost:3001/api/v1/auth/callback` | OAuth callback URL. |
| `DRIVE_FOLDER_ID` | empty | Root folder to index. |
| `DRIVE_REQUEST_TIMEOUT` | `15000` | Request timeout in milliseconds. |
| `DRIVE_CONCURRENCY` | `6` | Concurrent Drive operations. |

See the [storage guide](../../storage/) for OAuth setup, folder mapping, synchronization, and limitations.

### Security and cookies

| Variable | Default | Description |
| --- | --- | --- |
| `TRUST_PROXY` | `false` | Trust forwarded headers only behind a trusted proxy. |
| `RATE_LIMIT_ENABLED` | `false` | Enable API rate limiting. |
| `RATE_LIMIT_WINDOW_MS` | `60000` | Rate-limit window. |
| `API_RATE_LIMIT_PER_MINUTE` | `300` | Requests per window. |
| `APP_ACCESS_SECRET` | empty | Long random secret for sessions/OAuth state. |
| `ACCESS_SESSION_SECONDS` | `86400` | Session lifetime. |
| `SECURE_COOKIES` | `false` | Set `true` over HTTPS. |
| `COOKIE_SAME_SITE` | `lax` | `lax`, `strict`, or `none`; `none` requires secure cookies. |
| `LOG_LEVEL` | `info` | `error`, `warn`, `info`, or `debug`. |
| `USE_MOCK_DATA` | `false` | Development-only mock mode. |

### Web

| Variable | Description |
| --- | --- |
| `VITE_API_URL` | `/api` for same-origin, or an absolute API URL. |
| `VITE_DEV_PROXY_TARGET` | Backend target for the Vite development proxy. |
| `VITE_ALLOWED_HOSTS` | Allowed LAN/tunnel development hosts. |

Only `VITE_*` values reach the browser. Never put database passwords, OAuth secrets, or R2 secret keys in the Web environment file.

## Production rules

- Use `NODE_ENV=production`, HTTPS, `SECURE_COOKIES=true`, exact `ALLOWED_ORIGINS`, and a long random `APP_ACCESS_SECRET`.
- Enable rate limiting when the API is reachable from the Internet.
- Keep R2 private and issue signed URLs from the server when direct delivery is needed.
- Mount `DATA_DIR`, PostgreSQL data, and the original library on durable storage.
- Do not expose `/health/details` or administrative routes without authentication.
- Do not log environment objects, access tokens, signed URLs, or request authorization headers.
