---
title: Development Workflow
description: Follow the Araru Issue-first development and release workflow.
order: 30
section: "development"
status: stable
---

Araru changes follow this sequence:

```text
Pre-flight → Issue → Branch → Development → Validation → Commit → Push
→ Pull Request → CI → Merge → Release/Deploy → Final validation → Issue close
```

## Standards

1. Resolve the target repository through the runtime configuration and verify its directory, `.git`, remote, and GitHub identity.
2. Preserve local changes and synchronize a clean base branch with `git pull --ff-only`.
3. Create a detailed Issue in English before implementation.
4. Use `<type>/<issue>-<slug>` branches, for example `feat/184-password-policy`.
5. Use English Conventional Commits, for example `feat(security): add configurable password policy`.
6. Validate with the commands configured for the repository before committing.
7. Open a pull request with context, scope, acceptance criteria, validation results, and release impact. Reference the Issue with `Refs #<issue>` while release or deployment remains a gate.
8. Wait for required CI, release, package, publish, and deploy checks. Close the Issue only after final validation.

## Release contract

Distributable components use independent Semantic Versioning cycles:

```text
Conventional Commit → release-please PR → version/tag/release
→ package or publish immutable artifact → deploy → validation
```

Server and Web publish Docker images only after release-please creates a release. Documentation deploys its Pages artifact independently so non-release documentation changes remain deployable. Placeholder clients do not publish packages until they contain buildable applications.

For the complete operational rules, read the [runtime skill](https://github.com/araruoss/araruoss/blob/main/runtime/skills/araru-development-workflow/SKILL.md).
