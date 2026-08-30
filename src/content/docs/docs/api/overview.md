---
title: "HTTP API"
description: "Documentation for HTTP API in the Araru ecosystem."
order: 100
section: "api"
status: stable
---

Official base: `/api/v1`. JSON is used for data; content, pages, covers, and backups return binary data. The OpenAPI contract is in `araru-server/api/openapi.yaml`. Product endpoints are versioned exclusively under `/api/v1`; operational probes are `/health`, `/live`, and `/ready`.

## Conventions

- product endpoints use the versioned v1 contract;
- v1 collection endpoints return `{ items, pagination }` where applicable;
- v1 errors return `{ error: { code, message, requestId } }`;
- `details` appears only in development for internal failures;
- request ID is created by middleware and appears in logs;
- v1 limits `pageSize` to 100 and does not require clients to load the entire catalog;
- cookies and fetch use credentials; cross-origin requires exact CORS.

## Authentication

Empty installations expose only health, status, and setup. After setup, the API requires a persisted individual session in PostgreSQL identified by the HttpOnly cookie `araru_session`. OAuth Google controls the Drive source and does not authenticate library users. `APP_ACCESS_SECRET` remains available as an external credential protection key in installations that do not define another key; it does not function as a global login password.

## Content and Headers

PDF/EPUB local accept `Range` when served as files. Responses may include `Accept-Ranges`, `Content-Range`, `Content-Length`, `Content-Disposition`, `ETag`, `Last-Modified`, and `X-Total-Pages`. CORS exposes these headers.

Relevant statuses: 400 validation, 401 access, 403 origin/operation, 404 resource, 409 conflict, 413 payload, 416 Range, 422 content, 429 limit, and 500 internal failure.

See the [inventory](../endpoints/) and the [OpenAPI contract](https://github.com/araruoss/araru-server/blob/main/api/openapi.yaml). Incompatible changes require a new API version.
