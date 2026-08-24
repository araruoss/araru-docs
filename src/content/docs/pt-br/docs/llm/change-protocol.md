---
title: "Protocolo de alteração"
---

## Antes

1. leia project-context, contexto da área e constraints;
2. verifique ADRs; leia roadmap somente se a mudança for futura;
3. encontre implementação e testes reais;
4. identifique contratos, dados e arquivos do usuário afetados.

## Durante

- faça a menor alteração coerente;
- preserve API, IDs, migrations, Range e boundaries;
- não duplique abstrações;
- mantenha arquivo grande fora da RAM;
- não transforme direção futura em dependência atual.

## Depois

1. execute testes proporcionais;
2. corrija até passar;
3. atualize docs/API/LLM context;
4. crie ADR se houve decisão significativa;
5. valide Docker quando aplicável;
6. informe mudanças, riscos e validações.
