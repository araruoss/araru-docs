---
title: "Fluxos de dados"
---

## Catálogo

Filesystem/Drive → descoberta → fingerprint/ID → `library_files` → FTS → API → TanStack Query → biblioteca virtualizada.

## Leitura

```mermaid
sequenceDiagram
  actor User
  participant Web as Frontend reader
  participant API as Express API
  participant Store as Filesystem/Drive
  participant DB as PostgreSQL
  participant Cache as Redis
  User->>Web: abre Library File
  Web->>API: GET livro/capabilities
  Web->>API: GET conteúdo ou páginas
  API->>Store: stream/range/extract resource
  Store-->>API: bytes
  API-->>Web: 200/206 ou página
  Web-->>User: renderização
  Web->>API: PUT /reading-state
  API->>DB: upsert por perfil/livro
```

PDF usa Range no conteúdo original. EPUB é obtido como conteúdo e interpretado pelo parser frontend. MOBI e comics podem usar páginas/recursos derivados pelo backend. O progresso é mesclado localmente e remotamente pela posição mais recente.

## Metadados

Filename e conteúdo interno → normalização/ISBN → candidatos externos → score/confiança → campos sugeridos ou aplicados → PostgreSQL → revisão manual. Respostas externas são armazenadas temporariamente no Redis; campos manuais não são sobrescritos.
