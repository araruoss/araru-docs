# Clientes Desktop e Android — FUTURO

Nenhum cliente nativo existe atualmente. Web/PWA é o único cliente implementado.

Desktop e Android devem consumir o mesmo backend, sem filesystem ou banco direto. Para isso serão necessários contratos estáveis, versionamento, autenticação multi-device, sync idempotente, compatibilidade retroativa, downloads retomáveis, Range, gestão offline e telemetria com privacidade.

Tecnologias de UI/empacotamento não estão decididas. A escolha deve ocorrer após estabilizar API e modelo de identidade, com ADR próprio.
