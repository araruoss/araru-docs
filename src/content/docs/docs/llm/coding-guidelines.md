---
title: "Diretrizes de código para agentes"
---

Backend: mantenha route/controller/service; use logger estruturado; normalize erros; valide payload/paths; stream quando possível; use transactions; adicione migration; integre jobs longos à fila.

Frontend: use API client/TanStack Query; URL para navegação; evite duplicar estado global; trate loading/error/empty; preserve touch/mobile/foco; faça cleanup em effects/readers; lazy load áreas pesadas.

Antes de criar abstração, procure implementação existente com `rg`. Faça a menor mudança coerente. Não reformate arquivos não relacionados nem altere dados em `storage`.
