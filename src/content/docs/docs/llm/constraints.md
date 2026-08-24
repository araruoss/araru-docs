---
title: "Invariantes e restrições"
description: "Documentation for Invariantes e restrições in the Araru ecosystem."
order: 100
section: "llm"
status: stable
---

- arquivos grandes não podem ser carregados integralmente em RAM sem budget explícito;
- PDF local deve preservar streaming/Range e headers;
- frontend não acessa filesystem, bancos, paths físicos ou secrets;
- migrations aplicadas são imutáveis e verificadas por checksum;
- IDs e URLs existentes devem ser preservados;
- categorias vêm de diretórios/`categoryPath`, não tags;
- Work e Library File são conceitos distintos;
- cache nunca é fonte de verdade; derivados devem ser regeneráveis;
- falha transitória do Drive não deve remover arquivos imediatamente;
- campos manuais de metadata não devem ser sobrescritos automaticamente;
- readers devem implementar cleanup idempotente e progresso estável;
- mudanças de PWA exigem versionamento/testes de cache;
- operações destrutivas devem começar em dry-run/verificação;
- perfis não devem ser tratados como autenticação multiusuário;
- backend não serve a SPA; frontend usa proxy/API;
- roadmap não pode ser descrito como implementação atual.
