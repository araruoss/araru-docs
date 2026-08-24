---
title: Lançamentos
description: Versões semânticas e canais de lançamento independentes.
order: 100
section: "releases"
status: stable
---

Server, Web, Android, Desktop e Docs possuem ciclos de vida independentes. Um Server `1.4.2` não exige que o Web use a mesma versão. As tags de lançamento usam Versionamento Semântico quando o componente está pronto para esse compromisso.

Os workflows de tags do Server e do Web validam, criam GitHub Releases e publicam imagens no GHCR. Mudanças incompatíveis na API exigem notas explícitas de compatibilidade. Android e Desktop ainda não possuem lançamentos de produto.

A política completa de commits, automação, tags e containers está em [Versionamento semântico e releases](../development/semantic-versioning/).
