---
title: "Estrutura de projetos"
description: "Documentação sobre Estrutura de projetos no ecossistema Araru."
order: 100
section: "getting-started"
status: stable
---

O ecossistema é formado por repositórios independentes:

```text
araru-server   API, domínio, migrations, jobs e testes do servidor
araru-web      SPA/PWA, leitores e testes do cliente oficial
araru-docs     documentação e exemplo oficial de implantação
araru-android  reservado ao cliente Android
araru-desktop  reservado ao cliente desktop
```

Cada projeto possui dependências, lockfile, CI, releases e configuração próprios. Web e futuros clientes acessam dados somente pela API do Server; não acessam PostgreSQL, Redis, filesystem, Drive ou segredos diretamente.

- [Araru Server](https://github.com/araruoss/araru-server)
- [Araru Web](https://github.com/araruoss/araru-web)
- [Araru Docs](https://github.com/araruoss/araru-docs)
