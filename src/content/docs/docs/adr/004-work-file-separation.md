---
title: "ADR-004: Separate Work from Library File"
description: "Documentation for ADR-004: Separate Work from Library File in the Araru ecosystem."
order: 100
section: "adr"
status: stable
---

Status: Accepted  
Date: 2026-08-23 (retrospective)

## Context

`works` and `work_files` coexist with historical file IDs. Rationale inferred from current architecture.

## Decision

The canonical work groups physical files/formats without replacing existing IDs and URLs.

## Alternatives

Each file as a work; migrate old IDs.

## Consequences

Supports multiple formats and series; requires distinguishing `workId` from `fileId` in new resources.
