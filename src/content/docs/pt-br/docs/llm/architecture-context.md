---
title: "Contexto arquitetural para LLM"
---

Browser chama somente HTTP. Frontend mantém UI/estado efêmero; backend detém domínio, paths, credenciais e persistência. Nginx/Vite fazem proxy. Não mova regras de filesystem/metadata para o cliente.

Backend: route → controller → service → PostgreSQL/Redis/storage/provider. Watcher e jobs vivem no mesmo processo. PostgreSQL é fonte de verdade; Redis e derivados são regeneráveis. Filesystem é fonte principal, Drive opcional.

Reader: Library File → capability → endpoint de conteúdo/página → engine frontend → progresso `/reading-state` → cleanup. PDF exige Range; archives podem exigir extração limitada.

Work é obra canônica; Library File é arquivo físico. Categoria é `categoryPath`. IDs existentes são contratos.

Administração é um domínio explícito: frontend modular em `features/admin`, APIs reutilizadas e autorização server-side por `requireAdmin`. Nunca confunda `users` (autenticação) com `profiles` (contexto de consumo), nem persista configuração administrativa exclusivamente no Redis. Consulte `docs/architecture/admin-panel.md` antes de alterar setup, header, roles, profiles ou settings.

Detalhes: [arquitetura](../architecture/overview.md), [data flow](../architecture/data-flow.md), [ADRs](../adr/README.md).
