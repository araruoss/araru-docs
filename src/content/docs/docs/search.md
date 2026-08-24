---
title: Search
description: PostgreSQL Full Text Search, ranking, and filters.
---

Current search uses PostgreSQL Full Text Search. Indexed `tsvector` fields combine filename, path, category hierarchy, title, author, description, ISBN, and tags. GIN indexes support scalable lookup; normalization and `unaccent` improve matching.

Search filters and sorting are API concerns. Redis may cache results, but PostgreSQL remains authoritative. SQLite FTS5 is historical migration context only and is not part of the current architecture.
