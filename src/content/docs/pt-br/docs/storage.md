---
title: Armazenamento
description: Provedores de conteúdo implementados e planejados.
---

| Provedor | Estado | Observações |
| --- | --- | --- |
| Filesystem local | Estável | Montagem da biblioteca somente para leitura; as pastas definem as categorias. |
| Google Drive | Implementado, opcional | Configuração OAuth/API e sincronização incremental. |
| Cloudflare R2 | Planejado | Nenhum provedor de produção está disponível atualmente. |

Arquivos armazenados não são linhas do banco de dados. O Server indexa os recursos dos provedores no PostgreSQL e expõe IDs opacos, nunca caminhos físicos. Faça backup do conteúdo original separadamente do estado da aplicação.
