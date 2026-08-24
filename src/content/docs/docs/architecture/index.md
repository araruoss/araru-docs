---
title: Architecture Overview
description: Server/client boundaries and data flow.
sidebar:
  order: 1
order: 100
section: "architecture"
status: stable
---

Araru uses a Server/Client architecture. The Server owns durable state and content access; clients render experiences through the HTTP API.

```text
Clients → Express API → domain services → PostgreSQL
                           ├────────────→ Redis
                           ├────────────→ local storage
                           └────────────→ optional providers
```

PostgreSQL is authoritative. Redis failure may reduce performance but must not redefine durable state. Storage paths and credentials never cross the API boundary. See the confirmed [decision records](../adr/readme/).
