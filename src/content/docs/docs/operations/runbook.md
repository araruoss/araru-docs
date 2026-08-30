---
title: "Operations Runbook"
description: "Documentation for the Araru operations runbook."
order: 100
section: "operations"
status: stable
---

## Health

```bash
curl http://localhost:3001/health
curl http://localhost:3001/health/details
docker compose ps
docker compose logs --tail=200 backend frontend
```

Use details for catalog, queue, watcher, maintenance, runtime, and Drive. `/api/v1/admin/*` endpoints provide jobs, metrics, cache, covers, integrity, and circuit breakers.

## Catalog and cache

- normal refresh: watcher and reconciliation;
- cache cleanup: inspect first; POST is a dry run, `?apply=true` applies it;
- integrity: run a scan before repairing;
- covers: list problems and regenerate selectively;
- job: cancel only pending jobs; retry only failed/cancelled jobs.

## Backup

1. download `/api/v1/admin/backup`;
2. verify it at `/api/v1/admin/backup/verify`;
3. store it off-host;
4. for restore, use the required confirmation and a maintenance window;
5. validate health/catalog/reading state.

## Logs and metrics

Logs are JSON and should be searched by `event`/`requestId`. Metrics are process-local and reset with it; reader metrics persist in PostgreSQL. Redis keeps only disposable caches.
