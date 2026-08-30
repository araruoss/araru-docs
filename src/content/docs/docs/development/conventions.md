---
title: "Development Conventions"
description: "Documentation for development conventions in the Araru ecosystem."
order: 100
section: "development"
status: stable
---

## Backend

Routes only map; controllers adapt HTTP; services contain rules. Expected errors receive `statusCode`; middleware normalizes the envelope. Use a structured logger, never `console` or secrets. Streams/Range should avoid full buffers. Long jobs need deduplication, priority, retry, and observable state.

Migrations are append-only and transactional. Preserve IDs/URLs and the Work/File boundary. Cache is derived.

## Frontend

The API goes through `lib/api.js`; remote state uses Query; URLs provide shareable navigation; local state handles presentation. Components must preserve mobile/touch, focus, loading, errors, and cleanup. Readers use capabilities/core and do not duplicate the shell/progress behavior.

## Current style

ES modules, functional React/hooks, relative imports, and mostly Portuguese domain names. The current lint checks TODO/FIXME and console usage in the backend; it is not a complete semantic linter.
