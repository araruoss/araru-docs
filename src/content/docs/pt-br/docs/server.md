---
title: Araru Server
description: Backend central do ecossistema Araru.
---

# Araru Server

**Status: fundação estável**

O Server Node.js/Express é responsável por autenticação, usuários, perfis, catálogo, metadados, capas, busca, progresso, jobs, cache, backups e entrega HTTP de conteúdo.

PostgreSQL é a fonte de verdade. Redis armazena cache e coordenação efêmera. Storage local e Google Drive opcional fornecem arquivos. Requisições Range permitem leitura incremental de arquivos grandes.
