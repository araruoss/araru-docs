---
title: Primeiros passos
description: Execute o Araru e conclua a configuração inicial.
---

# Primeiros passos

Você precisa do Docker com Compose v2, uma pasta com seu acervo e espaço persistente para banco, cache e capas.

```bash
cd ~/Documents/projects/araruoss/runtime
make setup
# Defina uma POSTGRES_PASSWORD forte em .env
make up
make health
```

Abra `http://localhost:8080`. O assistente cria administrador, perfil inicial, idioma e tema global. Adicione arquivos em `runtime/storage/pdfs`; a hierarquia de pastas define as categorias.
