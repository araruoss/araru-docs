---
title: "Current limitations confirmed"
description: "Documentation for Current limitations confirmed in the Araru ecosystem."
order: 100
section: "roadmap"
status: planned
---

| Current state | Impact | When it becomes a problem | Direction possible — not decided |
|---|---|---|---|
| queue executed in API process | CPU/memory dispute job with API | heavy/high concurrency jobs | separate workers using PostgreSQL persistence |
| Redis cache without cluster required | optional dependency on an instance | high availability distributed cache | Sentinel/Managed cluster|
| rate limit in memory | unshared count | multiple instances | Redis/gateway |
| local runtime metrics | restart and do not aggregate hosts | distributed operation | OpenTelemetry/external stack |
| profiles are not accounts | without identity/authorization per user | multi-user public access | auth, users, sessions and ACL |
| filesystem and Drive coupled | new provider requires service changes |S3/R2/multiple regions | `StorageProvider` |
| a backend | no declared secure horizontal scaling | throughput/HA | stateless API + DB/cache shared |
| API v1 is the official contract | old clients need to be replaced | Independent Desktop/Android | new clients use `/api/v1`, schemas and OpenAPI |
| browser-centric offline | limited quota and portability | multiple devices | sync/downloadstable protocol |
| archives may require buffering/tools | variable cost per file | huge/malformed comics | isolated extraction and specialized streaming |

There is no benchmark that proves thousands of simultaneous connections. The current benchmark measures catalog, and the large file test measures range with sparse files.
