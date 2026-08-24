---
title: "ADR-001: separar frontend e backend"
description: "Documentation for ADR-001: separar frontend e backend in the Araru ecosystem."
order: 100
section: "adr"
status: stable
---

Status: Accepted  
Date: 2026-08-23 (retrospective)

## Context

O código possui workspaces, Dockerfiles e processos independentes. Rationale inferred from current architecture.

## Decision

Frontend é SPA/servidor estático; backend é API e não serve `dist`. Proxy integra `/api` e `/arquivos`.

## Alternatives

Express servir a SPA; deploy apenas cross-origin.

## Consequences

Builds e escala independentes; CORS/proxy precisam ser configurados; frontend não acessa estado interno.
