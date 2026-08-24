---
title: "Jobs, operação, Drive, observabilidade e segurança"
description: "Documentation for Jobs, operação, Drive, observabilidade e segurança in the Araru ecosystem."
order: 100
section: "backend"
status: stable
---

## Operação

Fila persistente oferece prioridade, dedupe, retries, recuperação e cancelamento de pendentes. Manutenção limpa metadados expirados, arquivos ausentes e cache LRU. Integridade compara índice, filesystem e derivados; reparos destrutivos exigem aplicação explícita. Backup exporta tabelas permitidas e restore é transacional.

## Google Drive

API key atende operações públicas configuradas; OAuth usa login/callback/logout. Tokens são criptografados antes do PostgreSQL. Cursor incremental e estado persistente evitam varredura completa. Timeout/concorrência são configuráveis; falha externa passa por circuit breaker/logs.

## Observabilidade

Logs JSON incluem timestamp, nível, evento e request ID; redaction remove segredos. `/api/health` é superficial; `/api/health/details` inclui runtime, índice, watcher, jobs, fila, Drive e sync. Endpoints operacionais expõem métricas, reader metrics, cache, integridade e circuit breakers.

## Segurança atual

- contas individuais usam hash `scrypt`, sessão HttpOnly persistida e expiração no PostgreSQL;
- `APP_ACCESS_SECRET` pode proteger credenciais OAuth, mas não concede acesso global à biblioteca;
- Bearer assinado é aceito onde o middleware prevê;
- Google OAuth é integração de storage, não login multiusuário;
- CORS com credenciais, rate limit local e headers defensivos;
- respostas privadas recebem `no-store`;
- erros 5xx escondem detalhe em produção.

Configurações globais, users, escrita de profiles, backup, metadados e `/operations` exigem `requireAdmin`. `/api/admin/overview` agrega estado não secreto e `/api/admin/audit` entrega auditoria ao administrador. Criação/alteração/exclusão de user, reset de senha, mudanças de profile e settings são persistidos em `admin_audit_log`, com remoção defensiva de detalhes sensíveis.

Profiles não são contas. Users são identidades autenticadas e profiles separam contextos de leitura; a associação muitos-para-muitos controla quais profiles cada user pode selecionar.
