---
title: "ADR-001: separate frontend and backend"
description: "Documentation for ADR-001: separate frontend and backend in the Araru ecosystem."
order: 100
section: "adr"
status: stable
---

Status: Accepted  
Date: 2026-08-23 (retrospective)

Context

The code has workspaces, Dockerfiles, and independent processes. Rationale inferred from current architecture.

Decision

Frontend is spa/static server; backend is API and does not serve `dist`. Proxy integrates `/api` and `/arquivos`.

Alternatives

Express serve the spa; deploy cross-origin only.

Consequences

Builds and independent scaling; CORS/proxy need to be configured; frontend does not access internal state.
