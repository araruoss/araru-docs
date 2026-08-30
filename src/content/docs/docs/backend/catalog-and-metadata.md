---
title: "Catalog, works, categories and metadata"
description: "Documentation for Catalog, works, categories and metadata in the Araru ecosystem."
order: 100
section: "backend"
status: stable
---

PRODUCTS

`driveService` discovers sources; `libraryIndexService` persists files and FTS. Existing IDs/URLs are preserved. Fingerprint detects change; watcher reconciles locally; periodic jobs perform maintenance. Absence has retention before definitive cleaning.

`Work` is canonical; `LibraryFile` is physical. `work_files` allows formats/duplicates without changing old IDs.

Categories are exclusively the path of the folder. Manual overrides do not create parallel tree.

## Metadata pipeline

```mermaid
flowchart LR
  F[Filename] --> N[Normalize]
  I[Internal metadata/pages] --> N
  N --> ISBN[ISBN validation]
  ISBN --> P[Google Books/Open Library]
  N --> P
  P --> M[Match and score]
  M --> C{Confidence}
  C -->|high| A[Auto apply]
  C -->|medium| R[Review suggestion]
  C -->|low| K[Keep current]
  A --> DB[(PostgreSQL)]
  A --> R[(Redis metadata cache)]
  R --> DB
```

Providers use positive/negative cache, timeout, retry, and circuit breaker. Matching considers ISBN, title/subtitle and authors. Manual fields are protected. Thresholds are configurable.

## Covers

Priority depends on the format and data available: inner cover/first image, provider, first page. The derivative records origin, dimensions, proportion, quality, fingerprint and version. File/pipeline change invalid; list/regenerate operation issues.
