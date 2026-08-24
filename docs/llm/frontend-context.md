# Contexto frontend para LLM

Entrypoint `main.jsx`; rotas/lazy em `App.jsx`; páginas em `pages`; UI em `components`; readers em `readers`; API em `lib/api.js`.

Estado remoto: TanStack Query. Navegação/filtros: URL. Fallback/progresso: localStorage + sync API. Scroll: sessionStorage. Offline: Cache Storage + IndexedDB. Tema: Context.

Biblioteca concentra navegação na sidebar/drawer e árvore de `categoryPath`; não reintroduza tabs globais no conteúdo. Histórico é “Continue de onde parou”; `/continuar` apenas redireciona.

Readers compartilham shell, dock, progresso, budget e cleanup. Preserve desktop/mobile/touch, viewport integral e worker PDF Vite `.js`. Service Worker não deve cachear livros automaticamente.

Testes mínimos para frontend: `npm run test:frontend`, build; reader/PWA exige E2E e performance.
