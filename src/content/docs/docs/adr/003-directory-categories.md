---
title: "ADR-003: Directory derived categories"
description: "Documentation for ADR-003: Categories derived from directories in the Araru ecosystem."
order: 100
section: "adr"
status: stable
---

Status: Accepted  
Date: 2026-08-23 (retrospective)

Context

The tree and filters use `categoryPath`. Rationale inferred from current architecture.

Decision

Directories are the hierarchical taxonomy; tags do not create categories.

Alternatives

Free tags or manual categories as primary font.

Consequences

Predictable and filesystem compliant organization; move file changes category.
