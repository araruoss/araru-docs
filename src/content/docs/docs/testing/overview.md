---
title: "Testing Strategy and CI"
description: "Documentation for Testing Strategy and CI in the Araru ecosystem."
order: 100
section: "testing"
status: stable
---

## Suites

- Web (`test` in `araru-web`): storage/progress, PWA cache, core/budget/cleanup of reader and sync merge;
- Server (`test` in `araru-server`): unit and integration tests for Express/PostgreSQL/filesystem in isolated `araru_test` database;
- E2E (`test/e2e-touchscreen.js`): build, temporary services, browser via `playwright-core`;
- benchmarks: configurable catalog and 1,000 record scenario;
- configurable API benchmark for health, system, works, operations/jobs, and p50/p95/p99 metrics;
- automated contract between `/api/v1` routes and OpenAPI;
- frontend performance: size of main, reader, and CSS.



```bash
npm run test:frontend
npm run test:backend
npm run test:e2e
npm run benchmark:catalog:1k
npm run benchmark:catalog
npm run benchmark:api
npm run check:performance
```



## Current CI

`.github/workflows/ci.yml` triggers on push and pull request, uses Node 22, runs `npm ci`, tests, E2E, two benchmarks, linting, and budget. It does not publish artifacts/deploy and does not run version matrix.

The E2E test covers proxy/cross-origin, Range/CORS, PDF/EPUB/MOBI/CBZ/CBR, touchscreen, PWA, and selective offline functionality. Backend tests use sparse files for 500 MB, 2 GB, and 5 GB without fully transferring them. `TEST_DATABASE_URL` can point to an external PostgreSQL database, but the database name must end with `_test`.
