---
title: "PostgreSQL and Redis"
description: "Documentation for PostgreSQL and Redis in the Araru ecosystem."
order: 100
section: "backend"
status: stable
---

PostgreSQL is the backend's only persistent source of truth. Redis is used only for shared cache and can be rebuilt without loss of functional state.

Boot

`server/database/postgresMigrations.js` applies idempotent foundation before application creation. It creates the `unaccent` extension, tables, B-tree/GIN indexes, search trigger, and initial records. `schema_migrations` registers the installed foundation.

Connections are configured by `DATABASE_URL`; pool, SSL and timeouts use `DATABASE_POOL_MAX`, `DATABASE_SSL`, `DATABASE_IDLE_TIMEOUT_MS` and `DATABASE_CONNECTION_TIMEOUT_MS`.

## Persistent domains

- `users`, `profiles` and `reading_state`: authentication, profiles and progress;
- `library_files`, `livros`, `categorias`, `works` and `work_files`: catalog, metadata and canonical work;
- `background_jobs`: queue, attempts, recovery and history;
- `secure_credentials` and `source_sync_state`: Encrypted OAuth and Drive cursor;
- `saved_views`, `book_preferences`, `series`, `work_series` and `feature_flags`: product features;
- `cache_entries`, `offline_items`, `integrity_reports`, `reader_metrics`,`duplicate_decisions` and `backup_history`: operation and audit.

All credentials registered in Segura will be displayed.

`library_files.search_vector` is a gin-indexed `tsvector`. Trigger and metadata updates apply `unaccent` and weights to title/authors, identifiers/tags, and context. Queries use `websearch_to_tsquery('simple', unaccent(...))`.

Redis

`REDIS_URL`, `REDIS_ENABLED` and `REDIS_KEY_PREFIX` control the connection. Metadata API cache uses positive and negative TTL. Temporary absence of Redis degrades cache, but does not change the authority of PostgreSQL.

## Backup and testing

Logical backup is JSON compressed with gzip, checksum, and transactional restore for allowed tables; credentials and users do not enter the default payload. `npm test --workspace @araru/server` creates/reboots only one database whose name ends in `_test`.
