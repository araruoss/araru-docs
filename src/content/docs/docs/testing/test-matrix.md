---
title: "Actual Coverage Matrix"
description: "Documentation for Actual Coverage Matrix in the Araru ecosystem."
order: 100
section: "testing"
status: stable
---

Caption: explicit ✓ coverage; — not confirmed by the current suite.

| Feature | Unitary | Integration | E2E | Benchmark |
|---|:---:|:---:|:---:|:---:|
| PDF Range | — | ✓ | ✓ | — |
| EPUB | — | ✓ fixture | ✓ | — |
| MOBI | — | ✓ fixture | ✓ | — |
| CBZ/CBR | — | ✓ fixture | ✓ | — |
| 500MB/2GB/5GB files | — | ✓ sparse | — | — |
| Core/cleanup/budget reader | ✓ | — | ✓ | — |
| Touch/mobile | — | — | | ✓ | — |
| PWA/selective offline | ✓ | — | ✓ | — |
| Categories/FTS/catalog | — |✓ | ✓ | ✓ |
| Metadata parsing/scoring | ✓ | ✓ partial | — | — |
| Cover quality | ✓ | ✓ endpoints | ✓ cards | — |
| jobs | ✓ | ✓ endpoints | — | — |
| OAuth/Drive persistence | ✓ | ✓ redirect | ✓ flow without Drive | — |
| Profiles/reading state | ✓ | ✓ | ✓ | — |
| Backup/restore | — | ✓ | — | — |
| Cache/integrity | ✓ partial | ✓ | — | — |
| Series/duplicates | ✓ partial | ✓ | — | — |
| Safety/CORS | ✓ | ✓| ✓ | — |

There are no declared concurrent load, p95/p99, multi-user or browser matrix tests. These items belong to the roadmap.
