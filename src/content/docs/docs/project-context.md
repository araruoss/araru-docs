---
title: Project Context for Agents
description: Current architecture, constraints, and known limitations.
order: 100
section: "project-context"
status: stable
---

## Current

- Server: Node.js/Express, PostgreSQL, Redis, local storage, optional Google Drive.
- Web: React/Vite PWA using only the Server API.
- Docs: Astro/Starlight static site with English root and pt-BR fallback.
- Readers: PDF, EPUB, MOBI, CBZ, and CBR.

## Rules

PostgreSQL is authoritative. Category hierarchy comes from `categoryPath`/filesystem. Clients do not access infrastructure directly. Preserve opaque IDs and public routes. Never commit personal storage, databases, `.env`, credentials, or caches.

## Planned, not current

Android, Desktop, R2, audiobooks, and plugin ecosystems must not be described as released. See the detailed [LLM context](llm/README/), [constraints](llm/constraints/), and [roadmap](roadmap/README/).
