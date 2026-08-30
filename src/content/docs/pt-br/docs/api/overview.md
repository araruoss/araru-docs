---
title: "API HTTP"
description: "Documentação sobre API HTTP no ecossistema Araru."
order: 100
section: "api"
status: stable
---

Base oficial: `/api/v1`. JSON é usado para dados; conteúdo, páginas, capas e backup retornam binário. O contrato OpenAPI está em `araru-server/api/openapi.yaml`. Endpoints de produto são exclusivamente versionados em `/api/v1`; sondas operacionais são `/health`, `/live` e `/ready`.

## Convenções

- endpoints de produto usam exclusivamente o contrato versionado v1;
- endpoints v1 retornam coleções paginadas com `{ items, pagination }` quando aplicável;
- erros v1 retornam `{ error: { code, message, requestId } }`;
- `details` aparece somente em desenvolvimento para falhas internas;
- request ID é criado pelo middleware e aparece nos logs;
- v1 limita `pageSize` a 100 e não exige que clientes carreguem o catálogo inteiro;
- cookies e fetch usam credenciais; cross-origin exige CORS exato.

## Autenticação

Instalações vazias expõem somente health, status e setup. Depois do setup, a API exige uma sessão individual persistida no PostgreSQL e identificada pelo cookie HttpOnly `araru_session`. OAuth Google controla a fonte Drive e não autentica usuários da biblioteca. `APP_ACCESS_SECRET` permanece disponível como chave de proteção de credenciais externas em instalações que não definam outra chave; não funciona como senha global de login.

## Conteúdo e headers

PDF/EPUB local aceitam `Range` quando servidos como arquivo. Respostas podem incluir `Accept-Ranges`, `Content-Range`, `Content-Length`, `Content-Disposition`, `ETag`, `Last-Modified` e `X-Total-Paginas`. CORS expõe esses headers.

Status relevantes: 400 validação, 401 acesso, 403 origem/operação, 404 recurso, 409 conflito, 413 payload, 416 Range, 422 conteúdo, 429 limite e 500 falha interna.

Consulte o [inventário](../endpoints/) e o [contrato OpenAPI](https://github.com/araruoss/araru-server/blob/main/api/openapi.yaml). Mudanças incompatíveis exigem nova versão da API.
