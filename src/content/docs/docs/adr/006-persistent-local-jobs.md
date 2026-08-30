---
title: "ADR-006: Local Jobs with Persistent History"
description: "Documentation for ADR-006: local jobs with persistent history in the Araru ecosystem."
order: 100
section: "adr"
status: stable
---

Status: Accepted  
Date: 2026-08-23 (retrospective)

Context

In-memory queue states persist in `background_jobs`. Rationale inferred from current architecture.

Decision

Backend executes jobs with priority, deduct, retry and local recovery.

Alternatives

Synchronous execution; external broker.

Consequences

No additional infrastructure and recovery; concurrency/coordination remains limited to one instance.
