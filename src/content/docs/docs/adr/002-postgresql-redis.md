---
title: "ADR-002: PostgreSQL as persistence and Redis as cache"
description: "Documentation for ADR-002: PostgreSQL as persistence and Redis as cache in the Araru ecosystem."
order: 100
section: "adr"
status: stable
---

Status: Accepted  
Date: 2026-08-23

Context

Catalog, authentication, progress, metadata, jobs, and operation need secure concurrency, structured queries, text search, and external service support.

Decision

PostgreSQL is the backend's only source of truth. Redis stores only caches with TTL. Original files remain in the filesystem or Google Drive, and derivatives remain regenerable.

Consequences

The application requires `DATABASE_URL`, creates schema and indexes on startup, and supports external PostgreSQL. Redis can be local or external and its unavailability should not cause persistent data loss.
