---
title: "Invariants and constraints"
description: "Documentation for Invariants and constraints in the Araru ecosystem."
order: 100
section: "llm"
status: stable
---

- large files cannot be fully loaded into RAM without explicit budget;
- Local PDF must preserve streaming/Range and headers;
- frontend does not access filesystems, banks, physical paths or secrets;
- applied migrations are immutable and checked by checksum;
- Existing IDs and URLs must be preserved;
- categories come from directories/`categoryPath`, not tags;
- Work and Library File are conceptsdistinct;
- cache is never a source of truth; derivatives must be regenerable;
- transient failure of the Drive should not remove files immediately;
- manual metadata fields should not be automatically overwritten;
- readers should implement idempotent cleanup and stable progress;
- PWA changes require versioning/cache testing;
- destructive operations must start in dry-run/check;
- profilesshould not be treated as multi-user authentication;
- backend does not serve spa; frontend uses proxy/API;
- roadmap cannot be described as current implementation.
