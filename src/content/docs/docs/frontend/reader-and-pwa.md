---
title: "Reader, responsividade e PWA"
---

# Reader, responsividade e PWA

## Reader

`Leitura.jsx` seleciona capability por formato. `ReaderShell` padroniza estados de abertura, erro, retry e encerramento. A dock sobreposta permanece visível em desktop/mobile e contém navegação, página e fechar.

PDF.js recebe um Worker criado pelo bundle Vite, evitando dependência de MIME `.mjs`. EPUB/MOBI são normalizados para páginas/conteúdo; comics requisitam imagens sob demanda. Cleanup cancela tarefas, destrói documentos, limpa canvases e revoga Object URLs.

Toque, clique e teclado são suportados. A página inteira é ajustada à viewport; a animação de virada foi removida.

## PWA

`public/sw.js` usa caches versionados. Navegações e catálogo são network-first; capas/assets usam stale-while-revalidate com limites. Payloads de livros são excluídos do cache automático. `offlineLibrary.js` baixa conteúdo somente sob ação explícita e registra metadados no IndexedDB.

O shell tem manifest, ícone e fallback offline. Ao alterar políticas, incremente `CACHE_VERSION` e rode testes PWA/E2E.

## Erros

`AppErrorBoundary` trata falhas globais. Queries exibem loading/erro/retry; readers mostram erro específico sem tela vazia; toasts comunicam operações. O código cancela trabalho assíncrono ao desmontar quando aplicável.
