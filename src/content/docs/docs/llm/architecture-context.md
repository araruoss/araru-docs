---
title: "Architectural context for LLM"
description: "Documentation for Architectural context for LLM in the Araru ecosystem."
order: 100
section: "llm"
status: stable
---

The browser only calls HTTP. The frontend maintains ephemeral UI/state; the backend holds domain, paths, credentials, and persistence. Nginx/Vite act as proxies. Do not move filesystem/metadata rules to the client.

Backend: route → controller → service → PostgreSQL/Redis/storage/provider. Watcher and jobs live in the same process. PostgreSQL is the source of truth; Redis and derivatives are regenerable. Filesystem is the primary source, Drive is optional.

Reader: Library File → capability → content/page endpoint → frontend engine → progress `/reading-state` → cleanup. PDF requires Range; archives may require limited extraction.

Work is canonical; Library File is a physical file. Category is `categoryPath`. Existing IDs are contracts.

Administration is an explicit domain: modular frontend in `features/admin`, reusable APIs, and server-side authorization via `requireAdmin`. Never confuse `users` (authentication) with `profiles` (consumption context), nor persist administrative configuration exclusively in Redis. Consult `docs/architecture/admin-panel.md` before changing setup, header, roles, profiles, or settings.

Details: [architecture](../../architecture/overview/), [data flow](../../architecture/data-flow/), [ADRs](../../adr/readme/).
