---
title: "Backend"
description: "Documentação sobre Backend no ecossistema Araru."
order: 100
section: "backend"
status: stable
---

`server/server.js` inicia ciclo de vida, migrations/jobs/watcher; `server/app.js` compõe Express, segurança, CORS, parsers, métricas, acesso, arquivos e rotas. Controllers convertem HTTP; services concentram domínio.

## Camadas reais

- `config`: ambiente e Google;
- `routes`: mapeamento HTTP;
- `controllers`: validação/adaptação e status;
- `services`: catálogo, storage, readers, metadados, produto e operação;
- `middleware`: headers, request ID, rate limit e sessão;
- `migrations`: schema incremental imutável.

O backend não entrega a SPA. `/sw.js` é somente um worker de migração para remover instalações antigas na porta da API.

Principais serviços: `driveService`, `libraryIndexService`, `readerService`, `metadataService`, `readingStateService`, `workService`, `profileService`, `jobQueueService`, `cacheService`, `integrityService`, `backupService` e observabilidade.

## Identidade e configuração inicial

- `system_settings` é a fonte de verdade do estado de setup e das configurações gerais;
- `users` guarda contas individuais e hashes `scrypt`; senhas nunca são persistidas em texto;
- `profiles` representa contextos de leitura, não credenciais;
- `user_profiles` implementa a associação muitos-para-muitos;
- `user_sessions` mantém sessões HttpOnly e o perfil ativo no servidor;
- `POST /api/v1/setup` executa a criação inicial em uma transação e retorna `409` depois da conclusão;
- ações administrativas são autorizadas no backend, incluindo a proteção do último administrador ativo.

O Redis continua reservado a cache e dados reconstruíveis. Usuários, sessões, associações, preferências e configurações permanecem no PostgreSQL.
