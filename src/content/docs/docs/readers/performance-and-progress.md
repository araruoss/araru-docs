---
title: "Performance, Range, and Progress"
description: "Documentation for reader performance, Range, and progress in the Araru ecosystem."
order: 100
section: "readers"
status: stable
---

## Large files

Local content uses streams and `fs.stat`; Range reads only the requested interval and returns `206`. E2E/backend tests create sparse files of 500 MB, 2 GB, and 5 GB and validate small ranges, demonstrating that the tested path does not allocate the entire file.

Configurable limits:

- `READER_MAX_IN_MEMORY_MB`: backend budget for operations that require buffering;
- `COVER_MAX_IN_MEMORY_MB` and `COVER_MAX_SOURCE_IMAGE_MB`: cover pipeline;
- frontend: `ResourceBudget` LRU and device/connection-aware prefetch.

Not every format can be fully streamed: ZIP/MOBI/archives may require an index or partial/full buffering depending on the library. Operations check the budget and should fail in a controlled way rather than exceed it.

## Range

The client sends `Range: bytes=start-end`; the backend validates limits and returns `Content-Range`, `Content-Length`, `Accept-Ranges`, and 416 for an invalid interval. The Nginx proxy disables buffering on content routes to preserve streaming.

## Progress

State contains ID, position/page, total, percentage, timestamps, and completion. The frontend writes a local fallback and synchronizes `/api/v1/works/:id/reading-state`. Merge chooses the most recent update per book/profile. History shows the cover, last access, and resume position.

New readers must implement a stable position, total when known, and idempotent cleanup.
