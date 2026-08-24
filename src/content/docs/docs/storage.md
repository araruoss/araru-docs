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

All providers belong to and are configured by the installation operator. Araru OSS does not host provider files. Only add legitimately acquired content that you are authorized to store and serve, and retain independent copies of the originals. See [Content ownership and responsibility](../concepts/content-responsibility/).
