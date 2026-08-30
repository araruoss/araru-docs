---
title: "Data Flows"
description: "Documentation for data flows in the Araru ecosystem."
order: 100
section: "architecture"
status: stable
---

## Catalog

Filesystem/Drive → descoberta → fingerprint/ID → `library_files` → FTS → API → TanStack Query → biblioteca virtualizada.

## Reading

```mermaid
sequenceDiagram
  actor User
  participant Web as Frontend reader
  participant API as Express API
  participant Store as Filesystem/Drive
  participant DB as PostgreSQL
  participant Cache as Redis
  User->>Web: opens Library File
  Web->>API: GET book/capabilities
  Web->>API: GET content or pages
  API->>Store: stream/range/extract resource
  Store-->>API: bytes
  API-->>Web: 200/206 or page
  Web-->>User: rendering
  Web->>API: PUT /reading-state
  API->>DB: upsert by profile/book
```

PDF uses Range on the original content. EPUB is fetched as content and interpreted by the frontend parser. MOBI and comics may use pages/resources derived by the backend. Progress is merged locally and remotely using the most recent position.

## Metadata

Filename and internal content → normalization/ISBN → external candidates → score/confidence → suggested or applied fields → PostgreSQL → manual review. External responses are stored temporarily in Redis; manual fields are not overwritten.
