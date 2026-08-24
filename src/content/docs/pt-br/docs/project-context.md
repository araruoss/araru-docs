---
title: Contexto do projeto para agentes
description: Arquitetura atual, restrições e limitações conhecidas.
order: 100
section: "project-context"
status: stable
---

## Estado atual

- Server: Node.js/Express, PostgreSQL, Redis, armazenamento local e Google Drive opcional.
- Web: PWA React/Vite que usa somente a API do Server.
- Docs: site estático Astro/Starlight com inglês na raiz e conteúdo em PT-BR.
- Leitores: PDF, EPUB, MOBI, CBZ e CBR.

## Regras

O PostgreSQL é a fonte de verdade. A hierarquia de categorias vem de `categoryPath` e do filesystem. Os clientes não acessam a infraestrutura diretamente. Preserve IDs opacos e rotas públicas. Nunca faça commit de armazenamento pessoal, bancos de dados, arquivos `.env`, credenciais ou caches.

## Planejado, ainda não disponível

Android, Desktop, R2, audiolivros e ecossistemas de plugins não devem ser descritos como lançados. Consulte o [contexto para LLMs](llm/README/), as [restrições](llm/constraints/) e o [roadmap](roadmap/README/) detalhados.
