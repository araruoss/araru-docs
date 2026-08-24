---
title: "API HTTP"
description: "Documentation for API HTTP in the Araru ecosystem."
order: 100
section: "api"
status: stable
---

Base atual: `/api`. JSON é usado para dados; conteúdo, páginas, capas e backup retornam binário. Não há OpenAPI nem versionamento `/v1` atualmente.

## Convenções

- sucesso geralmente retorna objeto ou `{ data }` conforme controller; não existe envelope único obrigatório;
- erros normalizados retornam `{ message, code, details? }`;
- `details` aparece somente em desenvolvimento para falhas internas;
- request ID é criado pelo middleware e aparece nos logs;
- não há paginação global no catálogo atual;
- cookies e fetch usam credenciais; cross-origin exige CORS exato.

## Autenticação

Instalações vazias expõem somente health, status e setup. Depois do setup, a API exige uma sessão individual persistida no PostgreSQL e identificada pelo cookie HttpOnly `araru_session`. OAuth Google controla a fonte Drive e não autentica usuários da biblioteca. `APP_ACCESS_SECRET` permanece disponível como chave de proteção de credenciais externas em instalações que não definam outra chave; não funciona como senha global de login.

## Conteúdo e headers

PDF/EPUB local aceitam `Range` quando servidos como arquivo. Respostas podem incluir `Accept-Ranges`, `Content-Range`, `Content-Length`, `Content-Disposition`, `ETag`, `Last-Modified` e `X-Total-Paginas`. CORS expõe esses headers.

Status relevantes: 400 validação, 401 acesso, 403 origem/operação, 404 recurso, 409 conflito, 413 payload, 416 Range, 422 conteúdo, 429 limite e 500 falha interna.

Consulte o [inventário](endpoints.md). OpenAPI é apenas uma melhoria futura.
