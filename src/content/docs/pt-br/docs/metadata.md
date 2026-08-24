---
title: Metadados
description: Identificação, enriquecimento, capas e revisão.
order: 100
section: "metadata"
status: stable
---

O pipeline começa pelo nome original do arquivo e pelos campos incorporados, extrai e valida candidatos a ISBN, normaliza o texto e pontua as correspondências encontradas. Os provedores opcionais Google Books e Open Library enriquecem os registros por meio de requisições com cache e tempo limite.

Limiares de confiança determinam se um candidato será aplicado ou enviado para revisão. Campos definidos manualmente continuam sendo autoritativos. As capas podem vir de recursos incorporados, da primeira página gerada ou de provedores. A detecção de duplicatas compara obras canônicas sem excluir automaticamente os arquivos de origem.
