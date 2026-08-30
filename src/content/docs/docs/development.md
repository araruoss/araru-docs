---
title: Development
description: Work with independent Araru repositories.
order: 100
section: "development"
status: stable
---

Clone only the repository you are changing. Each has its own dependencies, lockfile, tests, CI, version, and release lifecycle. The central repository also contains the portable development runtime used to discover and coordinate these projects.

```bash
git clone git@github.com:araruoss/araru-server.git
git clone git@github.com:araruoss/araru-web.git
git clone git@github.com:araruoss/araru-docs.git
```

Server changes must pass lint, tests, and build with isolated PostgreSQL/Redis. Web changes must pass lint, unit tests, build, and relevant E2E. Docs changes must pass Astro check, link validation, and static build.

See the [runtime guide](./runtime/) for workspace discovery and the [development workflow](./workflow/) for the complete Issue-to-release process.
