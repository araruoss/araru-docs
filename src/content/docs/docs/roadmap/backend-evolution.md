---
title: "Possible Backend Evolution — FUTURE"
description: "Documentation for possible future backend evolution in the Araru ecosystem."
order: 100
section: "roadmap"
status: planned
---

## Near-term capabilities to evaluate

- real authentication, users, authorization, devices, and revocable sessions;
- API versioning, schemas, and OpenAPI;
- storage abstraction preserving ID/fingerprint/Range;
- load tests and SLOs before making scalability claims.

## Possible later evolution

- PostgreSQL for shared state;
- Redis for rate limiting, cache/coordinator, and possibly queues;
- S3/Cloudflare R2 for objects;
- separate workers for covers, metadata, and archives;
- distributed observability and horizontal scaling.

## Undecided

- whether to remain on Node.js or introduce Go in specific components;
- incremental PostgreSQL migrations after the current foundation;
- Redis/broker/object provider;
- tenancy and authorization model;
- order and schedule.

Any adoption requires an ADR, migration, compatibility, and a benchmark. None of the technologies above exists in the current state.
