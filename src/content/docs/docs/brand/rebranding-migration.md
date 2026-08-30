---
title: "Migrating Biblioteca Digital → Araru"
description: "Documentation for Migrating Biblioteca Digital → Araru in the Araru ecosystem."
order: 100
section: "brand"
status: stable
---

Principle: **zero data loss**. Public identity changes; persisted contracts remain when the exchange offers no technical benefit.

| Item | Old | New | Migration | Breaking? |
|---|---|---|---|---:|
| product/UI/PWA | Biblioteca Digital | Araru | asset/text update | no |
| root package | `biblioteca-digital` | `araru` | package-lock updated | dev only |
| workspaces | `@biblioteca/*` | `@araru/server`, `@araru/web` | scripts/Docker/E2E updated | dev only |
| images/containers/network Compose | `biblioteca-*` | `araru-server:local`, `araru-web:local`, project `araru` | recreate containers; bind mounts same | no for data |
| PostgreSQL/schema/tables | stable internal names | preserved | none | no |
| API `/api/v1/works` | current | official | none | no |
| localStorage/events | `biblioteca:*` | preserved | direct compatibility | no |
| IndexedDB/offline cache | `biblioteca-digital-*` | preserved | avoids losing downloads | no |
| Service Worker caches | `biblioteca-digital-*` | preserved | avoids mass invalidation | no |
| cookies | `biblioteca_access`, `biblioteca_profile` | preserved | maintains sessions/profile | no |
| backup format | `biblioteca-digital-backup` | preserved | Araru continues importing old backups | no |
| metadata schema | `biblioteca-digital-metadata` | preserved | import/export compatible | no |
| download names | `biblioteca-*` | `araru-*` | only new filename | no |
| git directory/repository | `biblioteca-digital` | future `araru` | manual; update remote/registry | potential operational |

Legacy identifiers should be treated as compatibility namespaces, not visual text. Removing them in the future requires reading old + writing new, validation, and migration tests.

To rename the repository on GitHub in the future: rename in settings, update `git remote set-url origin <URL>`, registry/badges/releases and consumers. Final URL and registry are **TBD**.
