---
title: "Contexto backend para LLM"
description: "Documentação sobre Contexto backend para LLM no ecossistema Araru."
order: 100
section: "llm"
status: stable
---

Entrypoints: `server/server.js` e `server/app.js`. Config em `config/drive.js`. Rotas → controllers → services. Middleware implementa headers, rate limit, request ID e acesso.

PostgreSQL/schema: `database/postgresMigrations.js`; Redis: `redisService.js`. Índice/FTS: `libraryIndexService`. Fonte/arquivo/capas: `driveService`. Páginas: `readerService`. Metadados: `metadataService` e subpasta `metadata`. Jobs/cache/integridade/backup têm services próprios.

Conteúdo grande deve usar Range/stream; não faça `readFile` sem budget e justificativa por formato. Preserve ID opaco, fingerprint, categoryPath, Work/File e falha transitória do Drive.

Nova rota requer service/controller/router/teste/doc API. Alteração schema requer migration + teste new/upgrade. Backend não serve SPA; `/sw.js` só limpa PWA legado.
