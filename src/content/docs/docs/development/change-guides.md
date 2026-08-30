---
title: "Change Guides"
description: "Documentation for change guides in the Araru ecosystem."
order: 100
section: "development"
status: stable
---

## New route

1. add the rule in a service;
2. create or extend a controller;
3. register it in the appropriate router;
4. document method/path/auth/headers;
5. test success, validation, errors, and access.

## New migration

Use the next number, `version/name/up`, and register it in the index without editing old migrations. Test an empty database and upgrade from the previous version.

## New job

Define the handler, dedupe key, priority, concurrency/retry behavior, and observability. Test recovery and failure; expose an operation only when needed.

## New reader format

Add the extension/capability, backend delivery, frontend engine, cover, progress, and cleanup. Test a real fixture, errors, touch, large files, and PWA behavior. Do not load an entire file without an explicit budget.

## New storage provider (future)

There is no current interface. Such a change is architectural: preserve IDs, fingerprints, Range, retention, and transient failures; create an ADR before implementation.
