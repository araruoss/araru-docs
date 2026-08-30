---
title: "Migração Biblioteca Digital → Araru"
description: "Documentação sobre Migração Biblioteca Digital → Araru no ecossistema Araru."
order: 100
section: "brand"
status: stable
---

Princípio: **zero data loss**. Identidade pública muda; contratos persistidos permanecem quando a troca não oferece benefício técnico.

| Item | Antigo | Novo | Migração | Breaking? |
|---|---|---|---|---:|
| produto/UI/PWA | Biblioteca Digital | Araru | atualização de assets/textos | não |
| package raiz | `biblioteca-digital` | `araru` | package-lock atualizado | dev only |
| workspaces | `@biblioteca/*` | `@araru/server`, `@araru/web` | scripts/Docker/E2E atualizados | dev only |
| imagens/containers/rede Compose | `biblioteca-*` | `araru-server:local`, `araru-web:local`, projeto `araru` | recriar containers; bind mounts iguais | não para dados |
| PostgreSQL/schema/tabelas | nomes internos estáveis | preservados | nenhuma | não |
| API `/api/v1/works` | atual | oficial | nenhuma | não |
| localStorage/eventos | `biblioteca:*` | preservados | compatibilidade direta | não |
| IndexedDB/offline cache | `biblioteca-digital-*` | preservados | evita perder downloads | não |
| Service Worker caches | `biblioteca-digital-*` | preservados | evita invalidação em massa | não |
| cookies | `biblioteca_access`, `biblioteca_profile` | preservados | mantém sessões/perfil | não |
| backup format | `biblioteca-digital-backup` | preservado | Araru continua importando backups antigos | não |
| metadata schema | `biblioteca-digital-metadata` | preservado | import/export compatível | não |
| nomes de download | `biblioteca-*` | `araru-*` | apenas filename novo | não |
| diretório/repositório Git | `biblioteca-digital` | futuro `araru` | manual; atualizar remote/registry | potencial operacional |

Identificadores legados devem ser tratados como namespaces de compatibilidade, não texto visual. Removê-los futuramente exige leitura antiga + escrita nova, validação e testes de migração.

Para renomear o repositório no GitHub futuramente: renomeie nas configurações, atualize `git remote set-url origin <URL>`, registry/badges/releases e consumidores. URL final e registry são **TBD**.
