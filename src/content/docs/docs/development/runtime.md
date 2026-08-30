---
title: Development Runtime
description: Configure and use the portable Araru development runtime.
order: 20
section: "development"
status: stable
---

The development runtime lives in [`araruoss/araruoss/runtime`](https://github.com/araruoss/araruoss/tree/main/runtime). It provides repository discovery, Git pre-flight checks, configured validation commands, and safe workflow guidance. It is a local tool, not a server, daemon, CI system, or independent Git repository.

## Requirements

Use Git, Ruby with YAML support, a POSIX-compatible shell, and GitHub CLI (`gh`) for remote Issue and pull request operations. Docker Compose is optional and is only required for the local development stack.

## Workspace

The recommended layout keeps the central repository and components as siblings:

```text
workspace/
├── araruoss/
├── araru-server/
├── araru-web/
├── araru-design/
└── ...
```

The location is intentionally unrestricted. Set `ARARU_WORKSPACE_ROOT=/path/to/workspace` when using a different layout. The runtime also supports `ARARU_CONFIG` for testing an alternate repository configuration.

## Commands

```bash
path/to/araruoss/runtime/scripts/araru-status
path/to/araruoss/runtime/scripts/araru-start araru-web --dry-run
path/to/araruoss/runtime/scripts/araru-validate araru-web
```

Missing component checkouts appear as `not cloned` in status. A dry run performs discovery and pre-flight only; it does not create Issues, branches, commits, pull requests, releases, or other GitHub state.

Local `.state/`, storage, `.env`, credentials, caches, and personal libraries are excluded from the versioned runtime. Configure `ARARU_LIBRARY_PATH` externally when a local library is needed.

Agents should read [`runtime/AGENTS.md`](https://github.com/araruoss/araruoss/blob/main/runtime/AGENTS.md) and [`runtime/skills/araru-development-workflow/SKILL.md`](https://github.com/araruoss/araruoss/blob/main/runtime/skills/araru-development-workflow/SKILL.md) before changing an Araru repository.
