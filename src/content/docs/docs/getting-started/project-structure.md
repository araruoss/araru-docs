---
title: "Project Structure"
description: "Documentation for project structure in the Araru ecosystem."
order: 100
section: "getting-started"
status: stable
---

The ecosystem consists of independent repositories:

```text
araru-server   API, domain, migrations, jobs, and server tests
araru-web      SPA/PWA, readers, and official client tests
araru-docs     documentation and official deployment example
araru-android  reserved for the Android client
araru-desktop  reserved for the desktop client
```

Each project has its own dependencies, lockfile, CI, releases, and configuration. Web and future clients access data only through the Server API; they do not access PostgreSQL, Redis, the filesystem, Drive, or secrets directly.

- [Araru Server](https://github.com/araruoss/araru-server)
- [Araru Web](https://github.com/araruoss/araru-web)
- [Araru Docs](https://github.com/araruoss/araru-docs)
