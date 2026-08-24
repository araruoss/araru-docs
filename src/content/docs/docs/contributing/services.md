---
title: Contributing to services
description: Develop, test, and submit changes to Araru Server, Web, and runtime infrastructure.
---

Use this guide for changes to `araru-server`, `araru-web`, or the local runtime. Each repository has independent dependencies, releases, CI, and ownership; do not couple them through filesystem imports or shared `node_modules`.

## Before starting

You need Git, Node.js compatible with the repository `engines`, Docker with Compose v2, and enough local storage for images, PostgreSQL, Redis, and test fixtures. Read the target repository environment example without placing secrets in version control.

Choose the repository that owns the behavior:

| Change | Repository |
| --- | --- |
| HTTP API, authentication, catalog, metadata, jobs, PostgreSQL, Redis | `araru-server` |
| Library interface, reader UI, PWA, accessibility, client-side state | `araru-web` |
| Local orchestration and service composition | runtime repository |
| Public contracts and operational guides | `araru-docs` together with the owning service |

## Prepare the environment

```bash
git clone git@github.com:araruoss/araru-server.git
# or: git clone git@github.com:araruoss/araru-web.git
cd araru-server
git switch -c feature/short-description
npm ci
```

Use the repository's `.env.example` as the configuration reference. Start isolated PostgreSQL and Redis instances for backend development. Never point automated tests at a personal or production database.

## Architecture boundaries

- PostgreSQL is the durable source of truth; Redis stores reconstructible cache, locks, and ephemeral coordination only.
- Clients consume the Server HTTP API and must not access PostgreSQL, Redis, providers, or storage paths directly.
- Categories derive from the filesystem and `categoryPath`, not from tags.
- Content endpoints preserve opaque IDs, byte ranges, MIME types, and safe `Content-Disposition` headers.
- Migrations are incremental and immutable after release. Add a new migration instead of rewriting an applied one.
- Authentication and authorization must be enforced by the Server, regardless of client-side visibility.
- Readers must clean resources, bound memory use, preserve progress, and work with touch, keyboard, mobile, and desktop navigation.

## Implement and test

Start with the smallest change that proves the behavior. Add tests near the affected layer:

- unit tests for parsing, validation, ranking, and pure domain rules;
- integration tests for controllers, PostgreSQL repositories, Redis behavior, sessions, and jobs;
- API contract tests for status codes, response schemas, CORS, Range, and authorization;
- component tests for Web states and interactions;
- E2E tests for login, library navigation, search, reader progress, administration, and offline behavior;
- regression tests whenever fixing a reproducible bug.

Redis-unavailable behavior should degrade safely where cache is optional. Database failures must not be hidden as successful writes. Tests must clean their records and remain deterministic.

Run the scripts declared by the target repository. At minimum, validate lint, tests, and production build. For cross-service changes, run the complete Compose environment and verify the browser console, Server logs, health checks, PostgreSQL migrations, and Redis connectivity.

## Database and API changes

For a schema change, include the migration, repository/service updates, rollback or recovery notes, and integration tests against a clean PostgreSQL installation. Do not add SQLite compatibility code.

For an API change, update OpenAPI in `araru-server/api/openapi.yaml`, preserve compatibility when possible, document errors and authorization, and update every affected client. Breaking changes require an explicit migration path and release note.

## Pull request checklist

- The PR explains the user-visible problem and why the selected repository owns it.
- Tests fail without the fix and pass with it when practical.
- Lint, tests, build, and relevant E2E checks pass.
- New environment variables are documented and have safe defaults.
- Logs contain useful context without credentials or personal paths.
- Security, accessibility, localization, mobile, and desktop effects were reviewed.
- OpenAPI, documentation, screenshots, migrations, and release notes were updated where applicable.
- The PR does not contain unrelated formatting, generated state, or dependency churn.

## Review and release

Respond to review with focused commits or clearly explained follow-up changes. Maintainers may request an ADR for architectural work. A merged change is released according to the independent lifecycle of its repository; merge does not guarantee immediate deployment.

Report security vulnerabilities privately according to that repository's `SECURITY.md`.
