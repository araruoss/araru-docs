---
title: "ADR-004: separar Work de Library File"
description: "Documentação sobre ADR-004: separar Work de Library File no ecossistema Araru."
order: 100
section: "adr"
status: stable
---

Status: Accepted  
Date: 2026-08-23 (retrospective)

## Context

`works` e `work_files` coexistem com IDs históricos de arquivos. Rationale inferred from current architecture.

## Decision

Obra canônica agrupa arquivos físicos/formatos sem substituir IDs e URLs existentes.

## Alternatives

Cada arquivo ser uma obra; migrar IDs antigos.

## Consequences

Suporta múltiplos formatos e séries; exige distinguir `workId` de `fileId` em novos recursos.
