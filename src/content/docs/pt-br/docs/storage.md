---
title: Armazenamento
description: Provedores de conteúdo implementados e planejados.
order: 100
section: "storage"
status: stable
---

| Provedor | Estado | Observações |
| --- | --- | --- |
| Filesystem local | Estável | Montagem da biblioteca somente para leitura; as pastas definem as categorias. |
| Google Drive | Implementado, opcional | Configuração OAuth/API e sincronização incremental. |
| Cloudflare R2 | Planejado | Nenhum provedor de produção está disponível atualmente. |

Arquivos armazenados não são linhas do banco de dados. O Server indexa os recursos dos provedores no PostgreSQL e expõe IDs opacos, nunca caminhos físicos. Faça backup do conteúdo original separadamente do estado da aplicação.

Todos os provedores pertencem ao operador da instalação e são configurados por ele. O Araru OSS não hospeda os arquivos desses provedores. Adicione somente conteúdo adquirido legitimamente que você esteja autorizado a armazenar e disponibilizar, mantendo cópias independentes dos originais. Consulte [Propriedade e responsabilidade do conteúdo](../concepts/content-responsibility/).
