---
title: "Remediação de segurança — agosto de 2026"
description: "Status verificado da remediação da auditoria de segurança do Araru Server e Web."
order: 110
section: "security"
status: stable
---

Esta página registra a implementação verificada dos cinco achados da auditoria de segurança de agosto de 2026. O código e os resultados do CI são a fonte de verdade; nenhum achado é marcado como corrigido apenas porque o código mudou.

## Status

| Achado | Issue | Pull request | Status | Release |
| --- | --- | --- | --- | --- |
| SEC-001 — isolamento por biblioteca | [araru-server#13](https://github.com/araruoss/araru-server/issues/13) | [#16](https://github.com/araruoss/araru-server/pull/16) | Corrigido | Server `v0.2.2` |
| SEC-002 — bypass de autorização em testes | [araru-server#14](https://github.com/araruoss/araru-server/issues/14) | [#18](https://github.com/araruoss/araru-server/pull/18) | Corrigido | Server `v0.2.2` |
| SEC-003 — defaults do Compose de desenvolvimento | [araru-server#15](https://github.com/araruoss/araru-server/issues/15) | [#20](https://github.com/araruoss/araru-server/pull/20) | Corrigido | Server `v0.2.2` |
| SEC-004/005 — sanitização do reader | [araru-web#17](https://github.com/araruoss/araru-web/issues/17) | [#18](https://github.com/araruoss/araru-web/pull/18) | Corrigido | Web `v0.2.1` |

A automação de regressão de segurança foi integrada separadamente no [PR #21 do Server](https://github.com/araruoss/araru-server/pull/21) e no [PR #20 do Web](https://github.com/araruoss/araru-web/pull/20). Todos os checks aplicáveis do Actions passaram.

## Controles implementados

- A autorização do Server agora deriva as bibliotecas acessíveis de forma centralizada e aplica o escopo ao catálogo, recentes, home, busca, autores, séries, detalhes de obra e recursos de leitura/conteúdo. Administradores continuam com escopo global; `libraryId` enviado pelo cliente é apenas filtro, nunca autorização.
- Conteúdo EPUB e MOBI passa por sanitização HTML centralizada com DOMPurify e validação de esquema de URL antes dos dois sinks HTML do reader. Elementos ativos, handlers inline, SVG inline e esquemas perigosos são removidos; links externos recebem `noopener noreferrer`.
- A autorização administrativa não faz mais bypass para nenhum `NODE_ENV`. O harness de testes usa fixtures autenticadas explícitas, e o acesso administrativo anônimo possui teste de regressão.
- O Compose de desenvolvimento exige `POSTGRES_PASSWORD` e `REDIS_PASSWORD`, habilita autenticação do Redis, mantém portas de serviço internas por padrão e oferece override explícito limitado a localhost para debug.
- O CI executa testes dedicados de segurança do Server, testes de segurança do reader Web e um guard de sinks HTML que exige `sanitizeReaderHtml`.

## Evidências de validação

A validação do Server passou: `npm test` (40 testes), `npm run security:test`, `npm run lint`, `npm run build` e `docker compose config` com credenciais fortes de teste. A validação do Web passou: `npm test` (23 testes), `npm run security:test`, `npm run security:check`, `npm run typecheck`, `npm run lint` e `npm run build`.

Não foi necessária migration de banco. O `araru-design` não foi alterado porque nenhum padrão de interface reutilizável foi introduzido. O workflow de release do Server publicou `v0.2.2`; a correção do reader está incluída em `v0.2.1` do Web, enquanto a automação de CI, somente de testes, não altera a release de runtime.

## Verificações operacionais restantes

O build e o deploy da documentação devem continuar verdes depois do merge desta página. Operadores devem fornecer secrets fortes pelo mecanismo de secrets do ambiente e não devem usar o Compose de desenvolvimento como deployment público.
