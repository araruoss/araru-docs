---
title: "Inventário de endpoints da API v1"
description: "Inventário oficial da API versionada do Araru Server."
order: 100
section: "api"
status: stable
---

A única API de produto é `/api/v1`. As sondas operacionais permanecem fora do namespace: `/health`, `/live` e `/ready`.

## Acesso público

`GET /api/v1/system/info`, `GET /api/v1/client-config`, `GET /api/v1/system/status`, `POST /api/v1/setup`, `POST /api/v1/auth/login`, `POST /api/v1/auth/logout`, `GET /api/v1/access/session`, `GET /api/v1/auth/me`, `POST /api/v1/auth/change-password` e as rotas OAuth do Google Drive em `/api/v1/auth`.

## Biblioteca e leitura

`GET /api/v1/libraries`, `/libraries/:id`, `/works`, `/works/:id`, `/series`, `/series/:id`, `/series/:id/works`, `/authors`, `/authors/:id`, `/authors/:id/works`, `/search`, `/home`, `/works/recent`, `/reading/continue`, `/history`, `/favorites`, `/works/:id/reading-state` e `/works/:id/favorite`.

Works suportam paginação, busca, biblioteca, autor, categoria, formato, série, favorito, concluído, ordenação e direção. Entrega de conteúdo usa `/api/v1/works/:id/content`, `/cover`, `/pages` e `/content/url`, com Range, ETag, AbortSignal e signed URL quando configurado.

## Administração

Todos os endpoints administrativos exigem administrador autenticado: `/api/v1/admin/system`, `/settings`, `/users`, `/profiles`, `/libraries`, `/storage/providers`, `/metadata`, `/jobs`, `/backup`, `/security`, `/overview` e `/audit`.

Erros usam `{ error: { code, message, requestId } }`; coleções paginadas usam `{ items, pagination }`. O contrato autoritativo está em [`api/openapi.yaml`](https://github.com/araruoss/araru-server/blob/main/api/openapi.yaml).
