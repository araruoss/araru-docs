---
title: "Matriz de cobertura real"
---

# Matriz de cobertura real

Legenda: ✓ cobertura explícita; — não confirmada pela suíte atual.

| Recurso | Unitário | Integração | E2E | Benchmark |
|---|:---:|:---:|:---:|:---:|
| PDF Range | — | ✓ | ✓ | — |
| EPUB | — | ✓ fixture | ✓ | — |
| MOBI | — | ✓ fixture | ✓ | — |
| CBZ/CBR | — | ✓ fixture | ✓ | — |
| Arquivos 500MB/2GB/5GB | — | ✓ esparso | — | — |
| Core/cleanup/budget reader | ✓ | — | ✓ | — |
| Touch/mobile | — | — | ✓ | — |
| PWA/offline seletivo | ✓ | — | ✓ | — |
| Categorias/FTS/catálogo | — | ✓ | ✓ | ✓ |
| Metadata parsing/scoring | ✓ | ✓ parcial | — | — |
| Qualidade de capas | ✓ | ✓ endpoints | ✓ cards | — |
| Jobs | ✓ | ✓ endpoints | — | — |
| OAuth/Drive persistence | ✓ | ✓ redirect | ✓ fluxo sem Drive | — |
| Perfis/reading state | ✓ | ✓ | ✓ | — |
| Backup/restore | — | ✓ | — | — |
| Cache/integridade | ✓ parcial | ✓ | — | — |
| Séries/duplicidades | ✓ parcial | ✓ | — | — |
| Segurança/CORS | ✓ | ✓ | ✓ | — |

Não há testes declarados de carga concorrente, p95/p99, multiusuário ou browser matrix. Esses itens pertencem ao roadmap.
