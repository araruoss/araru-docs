---
title: "Troubleshooting"
description: "Documentation for Troubleshooting in the Araru ecosystem."
order: 100
section: "operations"
status: stable
---

## Backend does not start / PostgreSQL or Redis

Confirm `DATABASE_URL`, `REDIS_URL`, DNS/ports, credentials and healthchecks. Use `docker compose ps`, `docker compose logs server postgres redis` and `/health/details`. Redis can be temporarily disabled with `REDIS_ENABLED=false`; PostgreSQL is required.

## CORS or cookies

Use full origin in `ALLOWED_ORIGINS`; confirm protocol/port, `TRUST_PROXY`, `Secure` and `SameSite`. On Compose go to `8080`, not `3001`.

## Admin initial password does not appear

Password is only generated when PostgreSQL has no users yet. While the mandatory exchange is pending, it is repeated in the `auth.admin.bootstrap_pending` log and kept with restricted permission in `storage/.araru-admin-bootstrap.json`. `make admin-password` only queries this state and never rotates an already configured password. For an explicit administrative rotation, use `make admin-password-force`.

## PDF does not open / worker MIME

Rebuild frontend, confirm worker `.js` with `application/javascript`, close old SW and validate CSP. The current nginx contains MIME rule and the bundle instantiates Worker directly.

## Range not working

Verify 206, `Content-Range`, `Accept-Ranges`, CORS exposed headers and that the proxy does not buffer. Test with `curl -H 'Range: bytes=0-1023'` on the content endpoint.

## EPUB/MOBI/HQ fail

Confirm extension and unprotected/corrupted file. MOBI may require valid internal resources; CBZ requires zip; CBR relies on UnRAR/7z. Use logs with request ID and page endpoint.

## Cover does not generate

Check out Poppler/7z, memory, space, cache permissions, version/fingerprint, and problem covers dashboard. Perform regeneration; derivatives can be erased and recreated.

## Drive OAuth

Confirm credentials, exact redirect, HTTPS/cookies and Drive enabled. Public key API does not require OAuth. See sync/circuit breaker in health details.

## Job stuck

See `/operations/jobs`. Restart recovers `running` to `queued`; running jobs do not accept current cancellation. Manual retry is only valid for failed/cancelled.

## Large file memory

Do not download entire content on the client/backend. Confirm Range and budgets. Archives may require more memory; reduce concurrency and validate format. The sparse tests cover the PDF Range path, not every real combination.
