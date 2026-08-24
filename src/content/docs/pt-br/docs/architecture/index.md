---
title: Visão geral da arquitetura
description: Limites entre servidor e clientes e fluxo de dados.
sidebar:
  order: 1
---

O Araru usa uma arquitetura servidor/cliente. O Server controla o estado persistente e o acesso ao conteúdo; os clientes oferecem suas experiências por meio da API HTTP.

```text
Clientes → API Express → serviços de domínio → PostgreSQL
                           ├────────────→ Redis
                           ├────────────→ local storage
                           └────────────→ optional providers
```

O PostgreSQL é a fonte de verdade. Uma falha no Redis pode reduzir o desempenho, mas não deve redefinir o estado persistente. Caminhos de armazenamento e credenciais nunca atravessam a fronteira da API. Consulte os [registros de decisão](../adr/README/) confirmados.
