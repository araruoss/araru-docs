---
title: Current project state
description: Verified stack, modules, capabilities, constraints, and incomplete Araru work.
order: 1
section: project-context
status: stable
---

## Current stack

- Server: Node.js and Express with PostgreSQL as durable storage and Redis for cache and coordination.
- Web: React and Vite PWA consuming only the Server HTTP API.
- Docs: Astro, Starlight, Markdown/MDX, Mermaid, and Pagefind, statically deployed to GitHub Pages.
- Content: local read-only library storage and optional Google Drive integration.
- Readers: internal PDF, EPUB, MOBI, CBZ, and CBR experiences with shared progress.

## Current modules

Authentication, individual users, profiles, global administration, catalog indexing, filesystem categories, metadata enrichment, covers, search, reading progress, favorites, history/continue reading, jobs, integrity, backups, health, and operational settings are documented as implemented foundations.

## Invariants

The Server owns the API and authorization. Clients never connect to PostgreSQL or Redis. PostgreSQL is authoritative. Redis data is reconstructible. Repository releases are independent. Categories derive from provider paths and `categoryPath`. Source content is never silently deleted by metadata or duplicate workflows.

## Incomplete or planned

Android and Desktop clients, audiobooks, and a plugin ecosystem remain planned. Cloudflare R2, API v1, pagination, storage capabilities, and worker leases are implemented in the current Server working tree; MOBI support has format limitations. Planned items must not be presented as released.

See [architecture context](../../llm/architecture-context/), [coding constraints](../../llm/constraints/), [technical decisions](../../adr/readme/), and the [roadmap](../../roadmap/readme/).
