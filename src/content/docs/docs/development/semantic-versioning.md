---
title: Semantic versioning and releases
description: Understand independent Araru versions, Conventional Commits, release pull requests, tags, and container images.
order: 4
section: development
status: stable
---

Araru Server, Web, Docs, and future clients follow [Semantic Versioning](https://semver.org/) independently. A Server `2.3.0` does not require Web or Docs to use `2.3.0`; compatibility is expressed through documented API contracts rather than matching numbers.

## Version meaning

Given `MAJOR.MINOR.PATCH`:

- **PATCH** fixes compatible behavior, security, documentation, or internal defects without adding a public capability.
- **MINOR** adds backward-compatible functionality.
- **MAJOR** introduces an incompatible public API, persisted-data, configuration, operational, or user-facing contract change.

Pre-release identifiers such as `3.0.0-beta.1` may be used for explicitly unstable releases. Published stable versions are never reused or overwritten.

## Conventional Commits

Release Please derives the next version and changelog from commits merged into `main`:

```text
fix: prevent duplicate reading progress          # patch
feat: add series filtering                       # minor
feat!: replace the authentication contract       # major
```

A breaking change can also use a `BREAKING CHANGE:` footer. Common non-release types include `docs`, `test`, `ci`, `build`, `refactor`, `style`, and `chore`; they do not bump a version unless they contain a breaking-change marker.

Scopes are encouraged when useful, for example `fix(reader): release PDF resources`. A pull request may contain multiple commits, but every user-visible change should be represented by an accurate Conventional Commit.

## Automated release flow

1. Changes merge into `main` after repository CI passes.
2. Release Please evaluates commits since the last release.
3. It opens or updates a release pull request containing the next version and `CHANGELOG.md` entries.
4. Maintainers review and merge that release pull request.
5. Release Please creates the `vMAJOR.MINOR.PATCH` tag and GitHub Release.
6. Server and Web validate again and publish GHCR images for the exact version, `MAJOR.MINOR`, `MAJOR`, and `latest`.
7. Docs deploy remains independent: GitHub Pages publishes from `main`, while semantic tags describe documentation releases.

Do not run `npm version`, edit the Release Please manifest manually, or create a competing version tag during the normal flow. Emergency manual releases must preserve alignment between `package.json`, lockfile, changelog, manifest, tag, and image.

## Container versions

Production deployments should pin exact images such as `ghcr.io/araruoss/araru-server:2.4.1` and `ghcr.io/araruoss/araru-web:2.7.0`. The mutable `latest`, major, and minor aliases are convenient discovery channels, not reproducible deployment locks.

Server and Web versions are configured separately because they have independent lifecycles. Before upgrading, read both release notes and confirm API/configuration compatibility, migrations, backup requirements, and rollback instructions.

## Reserved repositories

Android and Desktop currently contain no released product, so they do not receive artificial package versions or tags. Their first implementation must adopt this policy before its first public release. The organization/profile repository and local runtime workspace are not versioned products; they reference independently versioned artifacts.
