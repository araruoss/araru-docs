# Inicialização e configuração do backend

`config/loadEnv.js` carrega ambiente; `config/drive.js` normaliza valores e paths e valida combinações. `createApp()` carrega credenciais, valida ambiente e prepara a biblioteca antes de expor rotas.

`server.js` inicia HTTP, tarefas de manutenção e watcher, e trata encerramento gracioso. Consulte o [`.env.example` do Server](https://github.com/araruoss/araru-server/blob/main/.env.example) para a lista completa.

## Pontos críticos

- `DATABASE_URL` é obrigatório e deve apontar para PostgreSQL;
- `REDIS_URL` é obrigatório quando `REDIS_ENABLED=true`; Redis é cache, não fonte de verdade;
- no Compose, `DOCKER_DATABASE_URL` e `DOCKER_REDIS_URL` substituem os serviços internos; mantenha-as vazias para usar `postgres` e `redis` da rede Docker;
- `LOCAL_LIBRARY_DIR` e o cache precisam das permissões adequadas;
- biblioteca pode ser somente leitura;
- Drive pode ser desabilitado sem impedir catálogo local;
- `TRUST_PROXY` deve refletir a topologia;
- o rate limit é desativado por padrão; habilite com `RATE_LIMIT_ENABLED=true` e ajuste `RATE_LIMIT_WINDOW_MS` e `API_RATE_LIMIT_PER_MINUTE` conforme a exposição da API;
- CORS usa origem exata ou same-host informado pelo proxy;
- secrets e tokens nunca devem aparecer em logs/documentação.

O runtime suportado é Node.js 22+. A inicialização falha cedo se PostgreSQL não estiver configurado ou acessível.
