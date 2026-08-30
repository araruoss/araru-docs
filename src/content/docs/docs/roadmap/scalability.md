---
title: "Scalability — FUTURE"
description: "Documentation for possible future scalability in the Araru ecosystem."
order: 100
section: "roadmap"
status: planned
---

Possible goal: grow to multiple users/connections without compromising streams and jobs. The current system makes no such claim.

Before changing the architecture, measure:

- concurrent connections and requests/s;
- stream and Range concurrency;
- TTFB, p50, p95, and p99 by route;
- memory/CPU by format and size;
- PostgreSQL capacity, connections, and latency;
- bandwidth and cache hit ratio;
- queue depth/latency/failure;
- sync and enrichment time.

Possible phases: reproducible baseline → remove a proven bottleneck → separate shared state → isolate workers → test multiple instances. Do not choose PostgreSQL/Redis/R2 based on expectation alone.
