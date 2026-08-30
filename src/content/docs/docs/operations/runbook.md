---
title: "Runbook operacional"
description: "Documentation for Runbook operacional in the Araru ecosystem."
order: 100
section: "operations"
status: stable
---

## Saúde

```bash
curl http://localhost:3001/health
curl http://localhost:3001/health/details
docker compose ps
docker compose logs --tail=200 backend frontend
```

Use details para catálogo, fila, watcher, manutenção, runtime e Drive. Endpoints `/api/v1/admin/*` oferecem jobs, métricas, cache, capas, integridade e circuit breakers.

## Catálogo e cache

- atualização normal: watcher e reconciliação;
- cache cleanup: consulte primeiro; POST é dry-run, `?apply=true` efetiva;
- integridade: rode scan antes de reparar;
- capas: liste problemas e regenere seleção;
- job: cancele apenas pendente; retry somente failed/cancelled.

## Backup

1. baixe `/api/v1/admin/backup`;
2. verifique em `/api/v1/admin/backup/verify`;
3. armazene fora do host;
4. para restore, use confirmação exigida e janela de manutenção;
5. valide health/catalog/reading state.

## Logs e métricas

Logs são JSON e devem ser pesquisados por `event`/`requestId`. Métricas são locais ao processo e reiniciam com ele; reader metrics persistem no PostgreSQL. Redis mantém apenas caches descartáveis.
