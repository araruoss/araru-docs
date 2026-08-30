---
title: "Current Architecture"
description: "Documentation for Current Architecture in the Araru ecosystem."
order: 100
section: "architecture"
status: stable
---

## Boundaries



```mermaid
flowchart TB
  subgraph Client[Frontend]
    UI[React UI]
    R[Readers]
    SW[Service Worker]
  end
  subgraph API[Backend]
    HTTP[Express routes/controllers]
    D[Domain services]
    J[Local persistent job queue]
  end
  subgraph Data[Persistence and storage]
    S[(PostgreSQL)]
    RC[(Redis cache)]
    L[Local library]
    C[Derived cover cache]
  end
  UI --> HTTP
  R --> HTTP
  SW --> HTTP
  HTTP --> D
  D --> S
  D --> RC
  D --> L
  D --> C
  D -. optional .-> G[Google Drive and metadata APIs]
  J --> D
```



The frontend presents and maintains ephemeral state. The backend holds rules, paths, credentials, indexing, and persistence. Communication is HTTP/JSON, except for content streams/binaries, pages, covers, and backups.

The frontend should not access the filesystem, databases, physical paths, or contain secrets. The backend should not depend on the build of the SPA. In development, there is a Vite proxy; in Compose, the frontend Nginx creates a single origin.

## Current Processes

- A Node process runs the API, watcher, queue, and maintenance;
- An Nginx process delivers the frontend and acts as a proxy;
- PostgreSQL is the source of truth for persistent state;
- Redis maintains shared caches and never substitutes PostgreSQL;
- Caches are auxiliary and regenerable.

Refer to [limitations](../../roadmap/current-limitations/) before proposing horizontal scaling or multi-user support.
