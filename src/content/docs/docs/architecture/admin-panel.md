---
title: "Administração, usuários e perfis"
description: "Documentation for Administração, usuários e perfis in the Araru ecosystem."
order: 100
section: "architecture"
status: stable
---

O Admin Panel centraliza configurações da instalação em `/admin`. A rota é carregada sob demanda, possui layout próprio e navegação adaptada: sidebar no desktop e drawer com alvos de toque no mobile/tablet.

## User e Profile

- **User** é a conta autenticada, com senha derivada por `scrypt`, role, status e sessões.
- **Profile** é o contexto de leitura. Histórico, progresso, favoritos e preferências pertencem ao profile ativo.
- `user_profiles` representa a relação muitos-para-muitos. A sessão guarda o profile ativo.
- Configurações globais pertencem à instalação em `system_settings`, nunca ao profile ou Redis.

O setup cria atomicamente no PostgreSQL o primeiro user como administrador, seu profile padrão e a associação. O backend impede excluir, desativar ou rebaixar o último administrador ativo.

## Seções funcionais

- Visão geral: saúde, quantidades, catálogo, jobs e versão;
- Geral e Aparência: identidade, região, idioma e tema globais;
- Usuários: criação, role, status, redefinição de senha e exclusão segura;
- Perfis: criação, associação com users e exclusão segura;
- Bibliotecas e Armazenamento: catálogo, scan e saúde dos providers;
- Metadados: revisão, duplicatas, importação e exportação;
- Tarefas: fila, retry/cancel, integridade, capas e cache;
- Backup: exportação, verificação e restauração confirmada;
- Segurança: auditoria administrativa;
- Sistema: PostgreSQL, Redis, watcher, ambiente e uptime.

Preferências individuais do leitor, visualizações salvas e downloads offline permanecem na área pessoal da biblioteca.

## Autorização e auditoria

O guard do frontend é apenas UX. O backend aplica `requireAdmin` em configurações globais, gestão de users/profiles, backup, metadados e operações. Um ID enviado pelo cliente nunca substitui autorização.

`admin_audit_log` registra ator, ação, tipo/alvo e timestamp sem senhas, hashes, tokens ou secrets. PostgreSQL é fonte de verdade; Redis continua reservado a cache e estado efêmero.

## Precedência visual

Quando aplicável: preferência do usuário, preferência do profile, padrão do servidor e sistema operacional. O idioma público do servidor também é aplicado antes do login.
