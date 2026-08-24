---
title: "Frontend"
description: "Documentation for Frontend in the Araru ecosystem."
order: 100
section: "frontend"
status: stable
---

SPA React iniciada em `src/main.jsx`. O entrypoint configura Router, tema, TanStack Query, error boundary, controle de acesso, toast, sincronização de leitura, telemetria local e Service Worker em produção. `App.jsx` faz lazy loading das páginas e da paleta.

## Estrutura

- `pages`: Setup, Biblioteca, Histórico, Estatísticas, Administração, Série e Leitura;
- `components`: navegação, cards, filtros, modais e painéis operacionais;
- `readers`: contrato, PDF.js, parsers EPUB/MOBI e comic client;
- `hooks`: catálogo e feature flags;
- `lib`: API, offline e telemetria;
- `utils`: armazenamento local e merge de progresso;
- `context`: tema e localização com catálogos em `src/locales` e fallback para `pt-BR`.

Estado remoto usa TanStack Query; URL mantém navegação; local/session storage mantém fallback e posição visual; IndexedDB/Cache Storage sustentam offline.

O cliente HTTP em `lib/api.js` normaliza `VITE_API_URL`, envia credenciais e oferece helpers de URL/fetch. Nenhum secret é incorporado ao build.

## Setup e administração

`AccessGate` consulta `/api/system/status`; o setup nunca é decidido por `localStorage`. Instalações vazias exibem um wizard responsivo de sete etapas. Após a conclusão, o fluxo segue para login.

O status público também entrega apenas as preferências não sensíveis `language`, `theme` e `libraryName`. Assim, idioma e tema são aplicados antes da tela de login. Os catálogos suportados ficam em `src/locales/pt-BR.js` e `src/locales/en.js`; `pt-BR` é o fallback. Ao salvar configurações globais, o frontend recarrega a aplicação para reaplicar o contexto em todas as rotas.

`/admin/*` usa o módulo `src/features/admin`, separado em navegação, layout, primitivas e páginas. Cada seção carrega apenas seu estado. Desktop usa sidebar; mobile/tablet usa drawer com alvos de toque. Tema e idioma globais ficam em Aparência. O header mostra user e profile ativo, permite trocar apenas entre profiles associados, mostra Administração somente para admin e encerra a sessão pelo backend.
