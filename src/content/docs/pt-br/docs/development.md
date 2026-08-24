---
title: Desenvolvimento
description: Trabalhe com os repositórios independentes do Araru.
---

Clone somente o repositório que será alterado. Cada um possui dependências, lockfile, testes, CI, versão e ciclo de lançamento próprios.

```bash
git clone git@github.com:araruoss/araru-server.git
git clone git@github.com:araruoss/araru-web.git
git clone git@github.com:araruoss/araru-docs.git
```

Mudanças no Server devem passar por lint, testes e build com PostgreSQL e Redis isolados. Mudanças no Web devem passar por lint, testes unitários, build e testes E2E relevantes. Mudanças no Docs devem passar pela verificação do Astro, validação de links e build estático.
