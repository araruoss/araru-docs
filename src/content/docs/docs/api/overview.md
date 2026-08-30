---
title: "API HTTP"
description: "Documentation for API HTTP in the Araru ecosystem."
order: 100
section: "api"
status: stable
---

Official base: `/api/v1`. JSON is used for data; content, pages, covers, and backups return binary data. The OpenAPI contract is in `araru-server/api/openapi.yaml`. Product endpoints are versioned exclusively under `/api/v1`; operational probes are `/health`, `/live`, and `/ready`.

## Convenções

- product endpoints use the versioned v1 contract;
- v1 collection endpoints return `{ items, pagination }` where applicable;
- v1 errors return `{ error: { code, message, requestId } }`;
- `details` aparece somente em desenvolvimento para falhas internas;
- request ID é criado pelo middleware e aparece nos logs;
- v1 limits `pageSize` to 100 and does not require clients to load the entire catalog;
- cookies e fetch usam credenciais; cross-origin exige CORS exato.

## Autenticação

Instalações vazias expõem somente health, status e setup. Depois do setup, a API exige uma sessão individual persistida no PostgreSQL e identificada pelo cookie HttpOnly `araru_session`. OAuth Google controla a fonte Drive e não autentica usuários da biblioteca. `APP_ACCESS_SECRET` permanece disponível como chave de proteção de credenciais externas em instalações que não definam outra chave; não funciona como senha global de login.

## Conteúdo e headers

PDF/EPUB local aceitam `Range` quando servidos como arquivo. Respostas podem incluir `Accept-Ranges`, `Content-Range`, `Content-Length`, `Content-Disposition`, `ETag`, `Last-Modified` e `X-Total-Paginas`. CORS expõe esses headers.

Status relevantes: 400 validação, 401 acesso, 403 origem/operação, 404 recurso, 409 conflito, 413 payload, 416 Range, 422 conteúdo, 429 limite e 500 falha interna.

See the [inventory](../endpoints/) and the [OpenAPI contract](https://github.com/araruoss/araru-server/blob/main/api/openapi.yaml). Incompatible changes require a new API version.
