---
title: "CHANGE PROTOCOL"
description: "Documentation for Amendment Protocol in the Araru ecosystem."
order: 100
section: "llm"
status: stable
---

PRIOR

1. read project-context, area context and constraints;
2. check ADRs; read roadmap only if change is future;
3. find actual implementation and testing;
4. identify affected user contracts, data, and files.

DURING

- make the slightest coherent change;
- preserve API, IDs, migrations, range and boundaries;
- do not duplicate abstractions;
- keep large file out of RAM;
- do not turn future direction into current dependency.

After

1. perform proportional tests;
2. correct until passed;
3. update docs/API/LLM context;
4. create ADR if there was a significant decision;
5. validate Docker when applicable;
6. report changes, risks and validations.
