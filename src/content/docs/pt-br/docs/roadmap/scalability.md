---
title: "Escalabilidade — FUTURO"
---

Objetivo possível: crescer para múltiplos usuários/conexões sem comprometer streams e jobs. O sistema atual não declara essa capacidade.

Antes de mudar arquitetura, medir:

- conexões concorrentes e requests/s;
- concorrência de streams e Range;
- TTFB, p50, p95 e p99 por rota;
- memória/CPU por formato e tamanho;
- capacidade, conexões e latência PostgreSQL;
- banda e cache hit ratio;
- profundidade/latência/falha da fila;
- tempo de sync e enriquecimento.

Fases possíveis: baseline reproduzível → remover gargalo comprovado → separar estado compartilhado → isolar workers → testar múltiplas instâncias. Não escolher PostgreSQL/Redis/R2 apenas por expectativa.
