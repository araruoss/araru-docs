---
title: Metadata
description: Identification, enrichment, covers, and review.
order: 100
section: "metadata"
status: stable
---

The pipeline starts with the original filename and embedded fields, extracts and validates ISBN candidates, normalizes text, and scores candidate matches. Optional Google Books and Open Library providers enrich records through cached, timeout-bound requests.

Confidence thresholds decide whether a candidate is applied or sent to review. Manual fields remain authoritative. Covers may come from embedded assets, generated first pages, or providers. Duplicate detection compares canonical works without deleting source files automatically.
