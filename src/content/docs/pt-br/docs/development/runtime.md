---
title: Runtime de desenvolvimento
description: Configure e use o runtime portátil de desenvolvimento do Araru.
order: 20
section: "development"
status: stable
---

O runtime de desenvolvimento vive em [`araruoss/araruoss/runtime`](https://github.com/araruoss/araruoss/tree/main/runtime). Ele oferece descoberta de repositórios, pre-flight do Git, comandos de validação configurados e orientação segura do workflow. É uma ferramenta local, não um servidor, daemon, sistema de CI ou repositório Git independente.

## Workspace

Use `ARARU_WORKSPACE_ROOT=/path/to/workspace` quando os repositórios não estiverem no layout padrão. Execute `araru-status` para listar repositórios clonados e ausentes. Use `araru-start araru-web --dry-run` para simular o pre-flight sem criar recursos no GitHub.

Estado local, storage, `.env`, credenciais, caches e bibliotecas pessoais não fazem parte do runtime versionado. Consulte o [guia em inglês](../runtime/) para requisitos, comandos e configuração completa.
