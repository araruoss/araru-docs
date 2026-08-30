---
title: "Security remediation — August 2026"
description: "Verified remediation status for the Araru Server and Web security audit."
order: 110
section: "security"
status: stable
---

This page records the verified implementation of the five findings from the August 2026 security audit. The code and CI results are the source of truth; no finding is marked fixed only because code changed.

## Status

| Finding | Issue | Pull request | Status | Release |
| --- | --- | --- | --- | --- |
| SEC-001 — library isolation | [araru-server#13](https://github.com/araruoss/araru-server/issues/13) | [#16](https://github.com/araruoss/araru-server/pull/16) | Fixed | Server `v0.2.2` |
| SEC-002 — test authorization bypass | [araru-server#14](https://github.com/araruoss/araru-server/issues/14) | [#18](https://github.com/araruoss/araru-server/pull/18) | Fixed | Server `v0.2.2` |
| SEC-003 — development Compose defaults | [araru-server#15](https://github.com/araruoss/araru-server/issues/15) | [#20](https://github.com/araruoss/araru-server/pull/20) | Fixed | Server `v0.2.2` |
| SEC-004/005 — reader sanitization | [araru-web#17](https://github.com/araruoss/araru-web/issues/17) | [#18](https://github.com/araruoss/araru-web/pull/18) | Fixed | Web `v0.2.1` |

The security regression automation was integrated separately in [Server PR #21](https://github.com/araruoss/araru-server/pull/21) and [Web PR #20](https://github.com/araruoss/araru-web/pull/20). All applicable pull-request Actions checks passed.

## Implemented controls

- Server authorization now derives accessible libraries centrally and applies the scope to catalog, recent, home, search, authors, series, work details and reader/content resources. Administrators remain globally scoped; client-supplied `libraryId` is only a filter, never authorization.
- EPUB and MOBI content passes through centralized DOMPurify HTML sanitization and URL-scheme validation before either reader HTML sink. Active elements, inline handlers, inline SVG and dangerous schemes are removed; external links receive `noopener noreferrer`.
- Administrative authorization no longer bypasses authentication for any `NODE_ENV`. The test harness uses explicit authenticated fixtures, and anonymous admin access is covered by regression tests.
- Development Compose requires `POSTGRES_PASSWORD` and `REDIS_PASSWORD`, enables Redis authentication, keeps service ports internal by default, and offers an explicit localhost-only debug override.
- CI runs dedicated server security tests, Web reader security tests and an HTML-sink guard requiring `sanitizeReaderHtml`.

## Validation evidence

Server validation passed: `npm test` (40 tests), `npm run security:test`, `npm run lint`, `npm run build`, and `docker compose config` with strong test credentials. Web validation passed: `npm test` (23 tests), `npm run security:test`, `npm run security:check`, `npm run typecheck`, `npm run lint`, and `npm run build`.

No database migration was required. `araru-design` was not changed because no reusable interface pattern was introduced. The Server release workflow published `v0.2.2`; the Web reader fix is included in `v0.2.1`, while test-only CI automation does not change the runtime release.

## Remaining operational checks

The documentation build and deployment must remain green after this page is merged. Production operators must supply strong secrets through their deployment secret mechanism and must not use the development Compose file as a public-facing deployment.
