---
title: Ecosystem
description: Responsibilities and maturity of every Araru module.
---

# Araru Ecosystem

```text
                     Araru Server
                          │ HTTP API
           ┌──────────────┼──────────────┐
           ▼              ▼              ▼
       Araru Web      Android         Desktop
        stable         planned         planned
```

- **Server:** source of truth for identity, catalog, state, and content delivery.
- **Web:** official browser client and PWA.
- **Android/Desktop:** repositories reserved for future clients.
- **Docs:** this static institutional and technical knowledge base.

Each repository has independent dependencies, CI, version, and release lifecycle. Clients never bypass the Server.
