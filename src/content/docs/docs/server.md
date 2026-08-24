---
title: Araru Server
description: Central backend for the Araru ecosystem.
order: 100
section: "server"
status: stable
---

**Status: Stable foundation**

Araru Server is the Node.js/Express backend. It owns authentication, users, profiles, catalog indexing, metadata, covers, search, reading progress, durable jobs, cache policy, backups, and HTTP content delivery.

- PostgreSQL is the source of truth and provides relational state, JSONB, and Full Text Search.
- Redis stores cache and ephemeral coordination.
- Local storage and optional Google Drive provide files.
- Range requests allow readers to fetch large content incrementally.

See [configuration](backend/configuration/), [PostgreSQL and Redis](backend/postgresql-and-redis/), and the [API](api/).
