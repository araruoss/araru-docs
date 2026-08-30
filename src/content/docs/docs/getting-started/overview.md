---
title: "Overview"
description: "Overview of Araru in the Araru ecosystem."
order: 100
section: "getting-started"
status: stable
---

Araru catalogs files, derives folder navigation, enriches metadata, and provides built-in readers. It is self-hosted and currently installation-oriented, although it supports reading profiles within that installation.

CURRENT STATE

- React/Vite frontend, served by Nginx in production;
- backend Node.js/Express;
- PostgreSQL as persistent source of state and index;
- Redis for shared cache with TTL;
- local filesystem as main source; Google Drive optional;
- PDF, EPUB, MOBI, CBZ and CBR in the internal reader;
- PWA and explicit offline download;
- jobs and maintenance performed in the backend process.

## Core concepts

- **Library File**: indexed physical file with an ID and fingerprint.
- **Work**: canonical work that can group more than one file/format.
- **categoryPath**: string of directories that defines the category.
- **Profile**: local context that isolates progress and preferences; not an authenticated account.
- **Derived File**: cover or other regenerable feature.

Details are in the [glossary](../../llm/glossary/) and [domain model](../../llm/domain-model/).
