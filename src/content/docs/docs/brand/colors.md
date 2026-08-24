---
title: "Cores"
description: "Documentation for Cores in the Araru ecosystem."
order: 100
section: "brand"
status: stable
---

Paleta pequena, inspirada sutilmente em céu, vegetação e terra do Cerrado. Os tokens vivem em `src/index.css` no `araru-web`; componentes não devem espalhar hex codes de marca.

| Semântica | Light | Dark | Uso |
|---|---|---|---|
| primary | `#176B87` | `#49A4C3` | marca, foco e ação principal |
| secondary | `#446B4F` | `#79A886` | apoio/sucesso orgânico |
| accent | `#BD5B3F` | `#E27B5C` | destaque raro/terra |
| background | `#F3F1EB` | `#111419` | página |
| surface | `#FAF9F5` translúcido | `#121418` translúcido | painéis |
| text | `#14181C` | `#F5F7FA` | conteúdo principal |
| muted | `#66717D` | `#95A0AB` | apoio |

Border deriva de texto/superfície com baixa opacidade. Success, warning e error continuam semânticos e devem cumprir contraste; consolidação de tokens específicos é **TBD**.

Valide WCAG 2.2 AA no par real de foreground/background, inclusive hover, foco e disabled.
