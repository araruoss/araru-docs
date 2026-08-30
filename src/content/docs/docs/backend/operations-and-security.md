---
title: "Jobs, Operations, Drive, Observability, and Security"
description: "Documentation for jobs, operations, Drive, observability, and security in the Araru ecosystem."
order: 100
section: "backend"
status: stable
---

## Operations

A persistent queue provides priority, deduplication, retries, recovery, and cancellation of pending jobs. Maintenance cleans expired metadata, missing files, and the LRU cache. Integrity compares the index, filesystem, and derived files; destructive repairs require explicit application. Backup exports permitted tables and restore is transactional.

## Google Drive

An API key serves configured public operations; OAuth uses login/callback/logout. Tokens are encrypted before PostgreSQL. An incremental cursor and persistent state avoid a full scan. Timeout/concurrency are configurable; external failures pass through circuit breakers/logs.

## Observability

JSON logs include a timestamp, level, event, and request ID; redaction removes secrets. `/health` is shallow; `/health/details` includes runtime, index, watcher, jobs, queue, Drive, and sync. The v1 administration API exposes metrics, cache, integrity, and circuit breakers.

## Current security

- individual accounts use `scrypt` hashing, a persisted HttpOnly session, and PostgreSQL expiration;
- `APP_ACCESS_SECRET` can protect OAuth credentials, but does not grant global library access;
- signed Bearer authentication is accepted where the middleware provides for it;
- Google OAuth is a storage integration, not multi-user login;
- credentialed CORS, local rate limiting, and defensive headers are enabled;
- private responses receive `no-store`;
- 5xx errors hide details in production.

Global settings, users, profile writes, backup, metadata, and `/api/v1/admin` require `requireAdmin`. `/api/v1/admin/overview` aggregates non-secret state and `/api/v1/admin/audit` provides audit data to administrators. User creation/updates/deletion, password resets, profile changes, and settings changes are persisted in `admin_audit_log`, with defensive removal of sensitive details.

Profiles are not accounts. Users are authenticated identities and profiles separate reading contexts; the many-to-many association controls which profiles each user may select.
