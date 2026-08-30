---
title: "Araru — quick project context"
description: "Documentation for Araru — quick project context in the Araru ecosystem."
order: 100
section: "llm"
status: stable
---

Araru is an open source and self-hosted ecosystem for cataloging and reading local or Google Drive files. The server, web, and documentation are independent projects that communicate exclusively via the HTTP API.

Former project name: Biblioteca Digital. Use the old name only to explain historical compatibility; refer to the product exclusively as Araru.

## Current

- frontend: React 18, Vite 8, Router, TanStack Query/Virtual, Tailwind, PDF.js, JSZip;
- backend: Node 22+, Express, `pg`, `ioredis`, Google APIs, Chokidar, parsers/extractors;
- data: Persistent PostgreSQL, Redis for cache, books on filesystem and derived covers on disk;
- formats: PDF, EPUB, MOBI, CBZ, CBR;
- deployment: frontend Nginx `8080`, API `3001`, same-origin proxy;
- tests: 8 frontend + 41 backend, integrated E2E testing, benchmarks and budget.

## Features

Catalog/FTS, categories by directories, favorites/recent, history with resumption, profiles, preferences, series/works, internal readers, progress, PWA/offline, metadata/covers, duplicates, backup, jobs, integrity and operation.

## Inputs

- Web: repository [`araru-web`](https://github.com/araruoss/araru-web), entry in `src/main.jsx` and routes in `src/App.jsx`;
- Server: repository [`araru-server`](https://github.com/araruoss/araru-server), entry in `server/server.js` and routes in `server/routes`;
- schema: `server/migrations` in `araru-server`;
- Docker: `docker-compose.yml` and Dockerfiles.

## Not Implemented

Real multi-user, PostgreSQL, Redis, S3/R2, external workers, horizontal scaling, OpenAPI and native clients.
