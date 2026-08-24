---
title: Leitores
description: Formatos compatíveis e comportamentos compartilhados de leitura.
sidebar:
  order: 1
order: 100
section: "readers"
status: stable
---

| Formato | Mecanismo atual |
| --- | --- |
| PDF | PDF.js com HTTP Range e renderização interna de páginas |
| EPUB | pipeline de arquivo/parser renderizado pelo cliente Web |
| MOBI | pipeline de parser com limitações do formato |
| CBZ | imagens ZIP indexadas |
| CBR | imagens RAR indexadas |

Todos os mecanismos compartilham contratos de navegação, progresso, limpeza, limite de memória, layout responsivo e telemetria. Arquivos grandes devem ser transmitidos ou obtidos em intervalos, em vez de carregados por completo. Consulte [formatos](./formats/) e [desempenho e progresso](./performance-and-progress/).
