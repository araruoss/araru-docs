---
title: "Catalog pipeline and reader contract"
description: "Content identity, indexing and the versioned Araru reader manifest."
order: 115
section: "architecture"
status: stable
---

## Source of truth

PostgreSQL is the source of truth for files, works, creators, series, reading state and jobs. Redis is cache and ephemeral coordination only. Each file has an operational fingerprint and, when available, a content hash (`sha256`, `md5` or a provider checksum), so content changes are not confused with filename or path changes.

## Pipeline states

`library_files.pipeline_status` and `pipeline_stage` make discovery, metadata extraction, cover generation and reader preparation observable. Errors retain a code and message for administrative retry; a failure must not erase an already catalogued work.

## Reader manifest

Before opening a work, the client may request `GET /api/v1/works/:id/manifest`. The response is versioned by content hash and describes `readingType` (`paged` or `reflowable`), format, pages, chapters, dimensions, direction and resource URLs. PDFs and comics use on-demand pages; EPUB/MOBI use reflowable content. The endpoint supports ETag and never exposes physical paths.

## Large files

`READER_MAX_IN_MEMORY_MB` prevents uncontrolled materialization of large files in Node. Large local PDFs use Poppler tools with bounded output; formats without safe streaming extraction are marked with an explicit retryable error rather than silently reading the complete file.
