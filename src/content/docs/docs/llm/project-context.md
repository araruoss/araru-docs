---
title: "Araru — contexto rápido do projeto"
---

Araru é um ecossistema open source e self-hosted para catalogar e ler arquivos locais ou do Google Drive. Server, Web e documentação são projetos independentes e comunicam-se exclusivamente pela API HTTP.

Former project name: Biblioteca Digital. Use o nome antigo somente ao explicar compatibilidade histórica; chame o produto exclusivamente de Araru.

## Atual

- frontend: React 18, Vite 8, Router, TanStack Query/Virtual, Tailwind, PDF.js, JSZip;
- backend: Node 22+, Express, `pg`, `ioredis`, Google APIs, Chokidar, parsers/extratores;
- dados: PostgreSQL persistente, Redis para cache, livros no filesystem e capas derivadas em disco;
- formatos: PDF, EPUB, MOBI, CBZ, CBR;
- deploy: frontend Nginx `8080`, API `3001`, proxy same-origin;
- testes: 8 frontend + 41 backend, E2E integrado, benchmarks e budget.

## Funcionalidades

Catálogo/FTS, categorias por diretórios, favoritos/recentes, histórico com retomada, perfis, preferências, séries/works, leitores internos, progresso, PWA/offline, metadados/capas, duplicidades, backup, jobs, integridade e operação.

## Entradas

- Web: repositório [`araru-web`](https://github.com/araruoss/araru-web), entrada em `src/main.jsx` e rotas em `src/App.jsx`;
- Server: repositório [`araru-server`](https://github.com/araruoss/araru-server), entrada em `server/server.js` e rotas em `server/routes`;
- schema: `server/migrations` no `araru-server`;
- Docker: `docker-compose.yml` e Dockerfiles.

## Não implementado

Multiusuário real, PostgreSQL, Redis, S3/R2, workers externos, escala horizontal, OpenAPI e clientes nativos.
