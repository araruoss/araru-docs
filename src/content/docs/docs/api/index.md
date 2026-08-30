---
title: API
description: Contract, authentication, errors, and endpoint reference.
order: 100
section: "api"
status: stable
---

Araru Server exposes its product contract exclusively under `/api/v1`, plus binary/range responses for reader content. Browser authentication uses an HttpOnly session cookie; protected endpoints return `401` without a session and `403` when the role is insufficient.

The source contract lives in [`araru-server/api/openapi.yaml`](https://github.com/araruoss/araru-server/blob/main/api/openapi.yaml). This site links to that source instead of maintaining a second divergent schema.

The v1 contract covers system/client configuration, session, libraries, works, series, authors, search, reading, favorites, history, home, administration, storage capabilities, settings, and jobs. Current endpoint notes are available in [Endpoints](./endpoints/); the OpenAPI file remains the source contract.
