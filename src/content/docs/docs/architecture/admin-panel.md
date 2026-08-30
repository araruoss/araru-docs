---
title: "Administration, users, and profiles"
description: "How the Araru administration context separates users, profiles, permissions, and installation settings."
order: 100
section: "architecture"
status: stable
---

The Admin Panel centralizes installation settings at `/admin`. The route is loaded on demand and uses its own responsive context: a sidebar on desktop and a drawer with touch-sized targets on mobile and tablet.

## User and Profile

- **User** is the authenticated account, with an `scrypt`-derived password, role, status, and sessions.
- **Profile** is a reading context. History, progress, favorites, and preferences belong to the active profile.
- `user_profiles` represents the many-to-many relationship. The session stores the active profile.
- Global settings belong to the installation in `system_settings`, never to a profile or Redis.

Setup atomically creates the first administrator, its default profile, and their association in PostgreSQL. The backend prevents deleting, disabling, or demoting the last active administrator.

## Functional sections

- Overview: health, counts, catalog, jobs, and version;
- General and Appearance: global identity, region, language, and theme;
- Users: creation, role, status, password reset, and safe deletion;
- Roles and permissions: product-area permission groups and protected system roles;
- Profiles: creation, user association, and safe deletion;
- Libraries and Storage: catalog, scans, provider configuration, and provider health;
- Metadata: review, duplicates, import, and export;
- Jobs: queue, retry/cancel, integrity, covers, and cache operations;
- Backup: export, verification, and confirmed restore;
- Security: authentication policy, sessions, rate limits, cookies, reader policy, and administrative audit;
- System: PostgreSQL, Redis, watcher, environment, and uptime.

Individual reader preferences, saved views, and offline downloads remain in the personal library area.

## Authorization and audit

The frontend guard is a UX boundary only. The backend applies `requireAdmin` to global settings, user/profile management, backup, metadata, and operations. An ID supplied by the client never replaces authorization.

`admin_audit_log` records the actor, action, target type/identifier, and timestamp without passwords, hashes, tokens, or secrets. PostgreSQL is the source of truth; Redis remains reserved for cache and ephemeral state.

## Tabs, pagination, and operational states

Sibling administrative views use URL-backed tabs where deep linking is useful. Searchable collections use `{ items, pagination }` and expose the current page, total, and previous/next controls. Jobs use the states `queued`, `running`, `completed`, `failed`, and `cancelled`; long-running accepted actions provide a path to Jobs.

All administrative surfaces define loading, empty, error, unauthorized, disabled, saving, saved, and destructive-confirmation states. Dialogs remain bounded and scrollable when forms are long, while their primary action stays available.

## Visual precedence

Where applicable: user preference, profile preference, server default, and operating system. The server's public language is also applied before login.
