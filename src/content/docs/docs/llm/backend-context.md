---
title: "Backend context for LLM"
description: "Documentation for Backend Context for LLM in the Araru ecosystem."
order: 100
section: "llm"
status: stable
---

Entrypoints: `server/server.js` and `server/app.js`. Config in `config/drive.js`. Routes → controllers → services. Middleware implements headers, rate limit, request ID, and access.

PostgreSQL/schema: `database/postgresMigrations.js`; Redis: `redisService.js`. Index/FTS: `libraryIndexService`. Source/file/covers: `driveService`. Pages: `readerService`. Metadata: `metadataService` and subfolder `metadata`. Jobs/cache/integrity/backup have their own services.

Large content should use Range/stream; do not do `readFile` without budget and format justification. Preserve Opaque ID, Fingerprint, CategoryPath, Work/File and Transient Drive Failure.

New route requires service/controller/router/test/doc API. Schema change requires migration + new/upgrade test. Backend does not serve spa; `/sw.js` only cleans legacy PWA.
