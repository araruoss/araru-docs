---
title: Storage
description: Implemented and planned content providers.
order: 100
section: "storage"
status: stable
---

| Provider | Status | Notes |
| --- | --- | --- |
| Local filesystem | Stable | Read-only library mount; folders define categories. |
| Google Drive | Implemented, optional | OAuth/API configuration and incremental synchronization. |
| Cloudflare R2 | Planned | No production provider is currently shipped. |

Storage files are not database rows. The Server indexes provider assets into PostgreSQL and exposes opaque IDs, never physical paths. Back up original content separately from application state.
