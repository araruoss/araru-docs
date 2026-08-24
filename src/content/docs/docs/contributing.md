---
title: Contributing
description: Choose how to contribute to Araru and follow the shared project workflow.
order: 100
section: "contributing"
status: stable
---

Araru is developed across independent repositories. Contributions may improve the Server and Web services, documentation, translations, tests, infrastructure, accessibility, or project design.

## Choose a contribution path

- [Contributing to services](services/) covers Server, Web, runtime, API, database, cache, readers, tests, and operational changes.
- [Contributing to documentation](documentation/) covers Astro/Starlight, writing, translations, navigation, links, and local validation.

## Shared workflow

1. Read the repository `README.md`, `CONTRIBUTING.md`, and `SECURITY.md` before changing code.
2. Search existing issues and discussions to avoid duplicate work.
3. Open an issue or discussion before large, architectural, breaking, or security-sensitive changes.
4. Fork or clone only the repository being changed and create a focused `feature/*`, `fix/*`, or `docs/*` branch.
5. Keep the change small, preserve public contracts, and add validation proportional to its risk.
6. Run the repository checks locally and update documentation when behavior changes.
7. Open a pull request describing the problem, solution, validation, risks, compatibility, and screenshots when relevant.

## Contribution rules

- Use clear commits that contain one logical change.
- Do not commit personal libraries, copyrighted books, generated databases, caches, `.env` files, tokens, passwords, or private URLs.
- Do not describe planned capabilities as released.
- Preserve opaque IDs, API routes, migration history, filesystem category behavior, and HTTP Range contracts unless an approved change explicitly replaces them.
- Add an ADR for decisions that materially alter architecture, persistence, security, or repository boundaries.
- Treat accessibility, responsive behavior, internationalization, and backward compatibility as acceptance criteria.

## Conduct and security

Be respectful and keep technical discussion focused on the work. Report vulnerabilities privately using the instructions in the affected repository's `SECURITY.md`; never disclose an exploitable issue in a public ticket.

By contributing, you agree that your changes are distributed under the repository license, currently `AGPL-3.0-only` unless that repository states otherwise.
