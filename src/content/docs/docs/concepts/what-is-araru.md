---
title: What is Araru?
description: Product philosophy, core concepts, and trust boundaries.
sidebar:
  order: 1
order: 100
section: "concepts"
status: stable
---

Araru organizes and serves a digital collection on infrastructure controlled by its owner. A central Server provides one authoritative home for storage, credentials, metadata, and reading state.

## Why self-hosted?

Self-hosting keeps files and behavioral data under your policies. Operators must still maintain HTTPS, strong credentials, backups, updates, and restricted network access.

Araru is software, not a hosted content service. The Araru project does not receive, store, provide, or distribute the files in a user's library. The installation operator supplies legitimately acquired files and makes them available only through infrastructure and networks they control. See [Content ownership and responsibility](../content-responsibility/).

## Core concepts

- **User:** an authenticated identity with a role and credentials.
- **Profile:** a reading context isolating preferences, favorites, and progress.
- **Library:** content discovered from configured storage.
- **Work:** the canonical item; **File:** a specific format representation.
- **Storage provider:** local filesystem today and Google Drive when configured.
- **Metadata provider:** filename and embedded data, then ISBN and optional external sources.
- **Reader engine:** a format-specific client engine with shared navigation and progress.
- **Background job:** durable indexing, reconciliation, metadata, or cover work.

Clients never connect directly to PostgreSQL, Redis, filesystem storage, Drive, or secrets.
