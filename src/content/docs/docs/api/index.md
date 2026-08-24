---
title: API
description: Contract, authentication, errors, and endpoint reference.
---

Araru Server exposes JSON endpoints under `/api` and binary/range responses for reader content. Browser authentication uses an HttpOnly session cookie; protected endpoints return `401` without a session and `403` when the role is insufficient.

The source contract lives in [`araru-server/api/openapi.yaml`](https://github.com/araruoss/araru-server/blob/main/api/openapi.yaml). This site links to that source instead of maintaining a second divergent schema.

Current endpoint notes are available in [Endpoints](endpoints/). Pagination and API versioning are not yet universal contracts; clients must not invent them.
