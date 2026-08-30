---
title: "Library, Categories, and Search"
description: "Documentation for the library, categories, and search in the Araru ecosystem."
order: 100
section: "frontend"
status: stable
---

The sidebar is global navigation. On desktop it can collapse; on mobile it becomes a drawer. Library opens the catalog and exposes the tree derived from `categoryPath`; recent items and favorites use the same content without duplicated tabs.

## Categories

- nodes come from the v1 library and works API;
- only the current branch expands by default;
- chevrons exist only for nodes with children;
- the full row navigates and counts are subtle;
- selection persists in the URL and preserves back/forward;
- in the drawer, intermediate categories keep the panel open; the final leaf may close it.

## Catalog

`Biblioteca.jsx` combines catalog, search, filters, subfolders, sorting, and grid/list modes. `VirtualBookGrid` reduces mounted elements. Cards lazy-load covers, show a fallback, and prefetch relevant data on open.

Header search changes `q`; the command palette provides navigation/actions. Backend search has FTS, while the frontend also composes presentation state and filters for the loaded catalog.

Side panels contain profiles, preferences, views, metadata, duplicates, offline, backup/import, and operations.
