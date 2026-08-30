---
title: Administration
description: Operate users, profiles, settings, storage, jobs, and backups.
order: 100
section: "admin"
status: stable
---

The admin panel centralizes global configuration and operational tools.

- **General/Appearance:** library name, global language, theme, timezone, and date format.
- **Users:** individual credentials, roles, activation, and password recovery.
- **Roles and permissions:** roles grouped by product area, explicit permission keys, protected system roles, and administrator-only authorization.
- **Profiles:** reading contexts assigned to users.
- **Storage/Metadata:** indexing, provider configuration, review, covers, and duplicates.
- **Jobs/System:** health, queues, cache, integrity, logs, and feature flags.
- **Backup/Security:** state export/restore, session policy, CORS, cookies, and rate limits.

Collections such as users, profiles, jobs, and other operational records use server-backed pagination. Search and filters are part of the request contract and return to the first page when changed. Jobs expose queued, running, completed, failed, and cancelled states; accepted long-running actions link back to the Jobs area.

Administration uses sibling tabs for related views, including Jobs overview, executions, schedules, and job types; Metadata summary, providers, and processing; and Security authentication, sessions, rate limits, cookies, reader policy, and audit. The selected tab is preserved in URL state where the view is deep-linkable.

The Web authorization guard controls navigation only. The Server remains authoritative for authentication, authorization, validation, persistence, and administrative audit. System roles and deployment-managed settings are not editable through ordinary forms.

**System settings** affect the installation. **User settings** affect an identity. **Profile preferences** affect a selected reading context. Keep these scopes separate.
