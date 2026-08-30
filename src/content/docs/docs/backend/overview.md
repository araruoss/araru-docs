---
title: "Backend"
description: "Documentation for the Araru backend in the Araru ecosystem."
order: 100
section: "backend"
status: stable
---

`server/server.js` starts the lifecycle, migrations, jobs, and watcher; `server/app.js` composes Express, security, CORS, parsers, metrics, access, files, and routes. Controllers translate HTTP; services hold domain logic.

## Actual layers

- `config`: environment and Google;
- `routes`: HTTP mapping;
- `controllers`: validation/adaptation and status;
- `services`: catalog, storage, readers, metadata, product, and operations;
- `middleware`: headers, request ID, rate limit, and sessions;
- `migrations`: immutable incremental schema.

The backend does not serve the SPA. `/sw.js` is only a migration worker for removing old installations from the API port.

Main services include `driveService`, `libraryIndexService`, `readerService`, `metadataService`, `readingStateService`, `workService`, `profileService`, `jobQueueService`, `cacheService`, `integrityService`, `backupService`, and observability.

## Identity and initial setup

- `system_settings` is the source of truth for setup state and general settings;
- `users` stores individual accounts and `scrypt` hashes; passwords are never persisted as plaintext;
- `profiles` represent reading contexts, not credentials;
- `user_profiles` implements the many-to-many association;
- `user_sessions` keeps HttpOnly sessions and the active profile on the server;
- `POST /api/v1/setup` performs initial creation in a transaction and returns `409` after completion;
- administrative actions are authorized in the backend, including protection of the last active administrator.

Redis remains reserved for cache and rebuildable data. Users, sessions, associations, preferences, and settings remain in PostgreSQL.
