---
title: "API v1 endpoint inventory"
description: "Official versioned Araru Server API endpoint inventory."
order: 100
section: "api"
status: stable
---

The only product API is `/api/v1`. Operational probes remain outside the product namespace: `/health`, `/live`, and `/ready`.

## Public access

`GET /api/v1/system/info`, `GET /api/v1/client-config`, `GET /api/v1/system/status`, `POST /api/v1/setup`, `POST /api/v1/auth/login`, `POST /api/v1/auth/logout`, `GET /api/v1/access/session`, `GET /api/v1/auth/me`, `POST /api/v1/auth/change-password`, and Google Drive OAuth routes under `/api/v1/auth`.

## Library and reading

`GET /api/v1/libraries`, `/libraries/:id`, `/works`, `/works/:id`, `/series`, `/series/:id`, `/series/:id/works`, `/authors`, `/authors/:id`, `/authors/:id/works`, `/search`, `/home`, `/works/recent`, `/reading/continue`, `/history`, `/favorites`, `/works/:id/reading-state`, and `/works/:id/favorite`.

Works support pagination, search, library, author, category, format, series, favorite, completed, sorting and ordering filters. Content delivery uses `/api/v1/works/:id/content`, `/cover`, `/pages`, and `/content/url` with Range, ETag, AbortSignal and signed URL support where configured.

## Administration

All administrative endpoints require an authenticated administrator: `/api/v1/admin/system`, `/settings`, `/users`, `/profiles`, `/libraries`, `/storage/providers`, `/metadata`, `/jobs`, `/backup`, `/security`, `/overview`, and `/audit`.

Errors use `{ error: { code, message, requestId } }`; paginated collections use `{ items, pagination }`. The authoritative contract is [`api/openapi.yaml`](https://github.com/araruoss/araru-server/blob/main/api/openapi.yaml).
