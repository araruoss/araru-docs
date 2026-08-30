---
title: "ADR-005: HTTP Range for large content"
description: "Documentation for ADR-005: HTTP Range for large content in the Araru ecosystem."
order: 100
section: "adr"
status: stable
---

Status: Accepted  
Date: 2026-08-23 (retrospective)

Context

API and tests support sparse PDF files up to 5GB. Rationale inferred from current architecture.

Decision

Applicable content uses streaming/range and buffer-free proxies.

Alternatives

Full buffer; prior download required.

Consequences

Memory does not grow with PDF size; clients/proxies need to preserve headers and 206/416.
