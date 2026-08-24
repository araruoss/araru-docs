# PostgreSQL e Redis

PostgreSQL é a única fonte de verdade persistente do backend. Redis é usado somente para cache compartilhado e pode ser reconstruído sem perda de estado funcional.

## Inicialização

`server/database/postgresMigrations.js` aplica a fundação idempotente antes da criação da aplicação. Ela cria a extensão `unaccent`, tabelas, índices B-tree/GIN, trigger de busca e registros iniciais. `schema_migrations` registra a fundação instalada.

As conexões são configuradas por `DATABASE_URL`; pool, SSL e timeouts usam `DATABASE_POOL_MAX`, `DATABASE_SSL`, `DATABASE_IDLE_TIMEOUT_MS` e `DATABASE_CONNECTION_TIMEOUT_MS`.

## Domínios persistidos

- `users`, `profiles` e `reading_state`: autenticação, perfis e progresso;
- `library_files`, `livros`, `categorias`, `works` e `work_files`: catálogo, metadados e obra canônica;
- `background_jobs`: fila, tentativas, recuperação e histórico;
- `secure_credentials` e `source_sync_state`: OAuth criptografado e cursor do Drive;
- `saved_views`, `book_preferences`, `series`, `work_series` e `feature_flags`: recursos de produto;
- `cache_entries`, `offline_items`, `integrity_reports`, `reader_metrics`, `duplicate_decisions` e `backup_history`: operação e auditoria.

## Busca

`library_files.search_vector` é um `tsvector` indexado por GIN. Trigger e atualizações de metadados aplicam `unaccent` e pesos para título/autores, identificadores/tags e contexto. As consultas usam `websearch_to_tsquery('simple', unaccent(...))`.

## Redis

`REDIS_URL`, `REDIS_ENABLED` e `REDIS_KEY_PREFIX` controlam a conexão. O cache de APIs de metadados usa TTL positivo e negativo. Ausência temporária de Redis degrada cache, mas não altera a autoridade do PostgreSQL.

## Backup e testes

O backup lógico é JSON compactado com gzip, checksum e restore transacional para tabelas permitidas; credenciais e usuários não entram no payload padrão. `npm test --workspace @araru/server` cria/reinicializa apenas um banco cujo nome termina em `_test`.
