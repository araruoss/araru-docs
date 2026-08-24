---
title: Development
description: Work with independent Araru repositories.
---

Clone only the repository you are changing. Each has its own dependencies, lockfile, tests, CI, version, and release lifecycle.

```bash
git clone git@github.com:araruoss/araru-server.git
git clone git@github.com:araruoss/araru-web.git
git clone git@github.com:araruoss/araru-docs.git
```

Server changes must pass lint, tests, and build with isolated PostgreSQL/Redis. Web changes must pass lint, unit tests, build, and relevant E2E. Docs changes must pass Astro check, link validation, and static build.
