---
title: "Storage Architecture"
description: "Documentation for storage architecture in the Araru ecosystem."
order: 100
section: "architecture"
status: stable
---

## Local filesystem

`LOCAL_LIBRARY_DIR` is traversed to discover supported formats. The local ID encodes the relative path; fingerprints and timestamps detect changes. `categoryPath` is the relative directory without the filename. Streams and Range avoid reading large PDFs in full.

## Google Drive

It is an optional source. Configuration accepts a single folder or `drive-folders.json`, an API key, and OAuth. OAuth credentials are encrypted in PostgreSQL; `source_sync_state` stores an incremental cursor. Failures must not delete items solely because of transient absence; the catalog uses status/retention.

## Derived files

`COVER_CACHE_DIR` stores regenerable covers. `cache_entries` records path, size, fingerprint, version, and last access. Integrity checks and LRU remove orphans/excess. Cache is never the source of truth.

## Future direction — not implemented

An interface such as `StorageProvider` and S3/R2 objects could reduce coupling and ease scaling. They do not exist currently; the filesystem and Drive are implemented directly in the current services.
