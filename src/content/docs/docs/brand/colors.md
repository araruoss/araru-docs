---
title: "Colors"
description: "Documentation for Araru brand colors in the Araru ecosystem."
order: 100
section: "brand"
status: stable
---

A small palette subtly inspired by the sky, vegetation, and soil of the Cerrado. Tokens live in `src/index.css` in `araru-web`; components should not scatter brand hex codes.

| Semantics | Light | Dark | Usage |
|---|---|---|---|
| primary | `#176B87` | `#49A4C3` | brand, focus, and primary action |
| secondary | `#446B4F` | `#79A886` | apoio/sucesso orgânico |
| accent | `#BD5B3F` | `#E27B5C` | destaque raro/terra |
| background | `#F3F1EB` | `#111419` | page |
| surface | `#FAF9F5` translucent | `#121418` translucent | panels |
| text | `#14181C` | `#F5F7FA` | primary content |
| muted | `#66717D` | `#95A0AB` | apoio |

Border derives from text/surface with low opacity. Success, warning, and error remain semantic and must meet contrast requirements; consolidation of specific tokens is **TBD**.

Validate WCAG 2.2 AA on the actual foreground/background pair, including hover, focus, and disabled states.
