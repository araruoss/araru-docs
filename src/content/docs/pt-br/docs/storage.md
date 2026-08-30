---
title: "Configuração de storage"
description: "Guia detalhado de configuração e operação dos providers Local, Google Drive e Cloudflare R2."
order: 100
section: "storage"
status: stable
---

O Araru separa metadados do catálogo dos bytes dos arquivos. O PostgreSQL guarda a identidade estável da biblioteca e os metadados do provider; o provider escolhido guarda o conteúdo original. Assim, Server e Web continuam independentes e paths físicos ou credenciais não são expostos ao navegador.

## Visão dos providers

| Provider | Ativação | Leitura | Escrita | Indicação |
| --- | --- | --- | --- | --- |
| Filesystem local | `STORAGE_PROVIDER=local` | Stream e HTTP Range | Gerenciada pelo operador | Desenvolvimento, host único e bibliotecas existentes |
| Google Drive | `ENABLE_GOOGLE_DRIVE=true` e credenciais | API/OAuth, stream e Range | Não usada pelo fluxo de catálogo | Bibliotecas já existentes no Drive |
| Cloudflare R2 | `STORAGE_PROVIDER=r2` e quatro valores R2 obrigatórios | Stream, Range e leitura assinada | Upload assinado, put, multipart e delete | Object storage privado |

A seleção do provider é atualmente global por instalação. Uma relação provider/biblioteca poderá ser adicionada no futuro; trocar o provider não migra objetos automaticamente.

## Filesystem local

```dotenv
STORAGE_PROVIDER=local
DATA_DIR=storage
LOCAL_LIBRARY_DIR=storage/pdfs
COVER_CACHE_DIR=storage/cache/covers
```

Coloque os arquivos suportados em `LOCAL_LIBRARY_DIR`. O watcher e a atualização agendada descobrem os arquivos e persistem a identidade no PostgreSQL. Mantenha esse diretório em volume persistente com permissão de leitura para o servidor. Capas geradas e arquivos temporários ficam separados.

Layout recomendado:

```text
storage/
├── pdfs/                 # arquivos originais
├── cache/covers/         # capas derivadas e recriáveis
├── drive-folders.json    # mapeamento opcional do Drive
├── categorias.json       # metadados manuais opcionais
└── .araru-admin-bootstrap.json
```

Faça backup de `pdfs/` separadamente do PostgreSQL. Um backup do banco sem os arquivos originais não restaura os bytes do conteúdo.

## Google Drive

### Configuração OAuth

1. Crie ou selecione um projeto no Google Cloud.
2. Habilite a Google Drive API.
3. Configure a tela de consentimento OAuth e adicione administradores como usuários de teste quando necessário.
4. Crie um cliente OAuth do tipo Web.
5. Cadastre exatamente a URL em `GOOGLE_REDIRECT_URI`; localmente, normalmente é `http://localhost:3001/api/v1/auth/callback`.
6. Configure as credenciais somente no servidor:

```dotenv
ENABLE_GOOGLE_DRIVE=true
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_REDIRECT_URI=https://api.example.com/api/v1/auth/callback
DRIVE_FOLDER_ID=id-da-pasta-raiz
DRIVE_REQUEST_TIMEOUT=15000
DRIVE_CONCURRENCY=6
APP_ACCESS_SECRET=segredo-aleatorio-longo
```

O escopo OAuth do Drive é somente leitura. O estado do token é armazenado criptografado em `DATA_DIR`; preserve `APP_ACCESS_SECRET` ou o estado criptografado não poderá ser usado após reiniciar.

Para recursos públicos, `GOOGLE_API_KEY` pode substituir OAuth. Uma API key não substitui OAuth para arquivos privados.

### Pastas e sincronização

`DRIVE_FOLDER_ID` define a pasta raiz. `DRIVE_FOLDERS_CONFIG` permite regras adicionais de pasta/categoria. O servidor pagina a listagem, mantém cursor incremental de alterações, processa arquivos removidos, repete falhas transitórias e usa circuit breaker após falhas repetidas. Reduza `DRIVE_REQUEST_TIMEOUT` e `DRIVE_CONCURRENCY` em instalações pequenas ou diante de quotas restritivas.

O conteúdo do Drive é transmitido por stream e suporta HTTP Range quando permitido pelo provider. MOBI/CBR grandes não são carregados desnecessariamente em um buffer de memória.

## Cloudflare R2

### Bucket e token de API

1. Crie um bucket R2 na conta Cloudflare da instalação.
2. Mantenha o bucket privado; não habilite acesso público como atalho para entrega.
3. Crie um token R2 limitado ao bucket e às operações necessárias. Para somente leitura, conceda leitura/listagem; para uploads administrativos, conceda apenas escrita/delete/multipart necessários.
4. Copie o endpoint S3 exibido pela Cloudflare, normalmente `https://<account-id>.r2.cloudflarestorage.com`.
5. Armazene access key e secret em um gerenciador de segredos ou no ambiente do servidor.

```dotenv
STORAGE_PROVIDER=r2
R2_ENDPOINT=https://<account-id>.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
R2_BUCKET=araru-library
R2_REGION=auto
R2_PUBLIC_URL=
R2_SIGNED_URL_TTL=300
R2_PREFIX=library/
```

O servidor não cria o provider R2 quando falta `R2_ENDPOINT`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY` ou `R2_BUCKET`. `R2_PUBLIC_URL` é opcional e deve permanecer vazio para entrega privada.

### Chaves e identidade do catálogo

As chaves R2 são chaves opacas do provider, não paths de filesystem. Uploads administrativos usam o prefixo `uploads/<id-unico>/...`. Ao concluir, o servidor executa `HEAD` e grava em `library_files` tamanho, MIME, ETag/checksum, provider e key. A identidade do catálogo continua no PostgreSQL.

### Upload e entrega

O endpoint protegido `POST /api/v1/admin/storage/r2/upload-url` retorna uma URL `PUT` assinada de curta duração e a chave do objeto. O cliente envia diretamente ao R2 e chama `POST /api/v1/admin/storage/r2/complete`. O servidor valida o prefixo, executa `HEAD` e indexa os metadados.

Para entrega privada direta, um cliente autenticado pode chamar `GET /api/v1/works/:id/content/url`. A URL retornada é temporária e não deve ser persistida nem registrada em logs. A entrega normal continua em `GET /api/v1/works/:id/content`, com suporte a `Range`, `ETag`, `Last-Modified` e `HEAD`.

O provider R2 possui operações multipart para arquivos grandes: iniciar, enviar parte, concluir e cancelar. A integração deve manter o upload ID e os ETags das partes até a conclusão e cancelar uploads abandonados conforme a política operacional.

## Saúde e operação

- `/live` é o liveness leve; `/ready` verifica PostgreSQL e as dependências de storage configuradas.
- `/health/details` é administrativo e mostra configuração/saúde dos providers; mantenha autenticação e acesso privado.
- A tela Admin de operações mostra storage, jobs, cache, integridade e circuit breakers.
- Monitore quantidade de objetos, uso, erros, respostas 403/404 e falhas de URLs assinadas no painel do provider.

## Checklist de segurança e backup

- Nunca exponha credenciais R2, segredos OAuth, refresh tokens ou URLs assinadas no Web ou nos logs.
- Use CORS exato e HTTPS em produção.
- Limite tokens R2 ao bucket e às operações necessárias.
- Faça backup independente do PostgreSQL e do conteúdo original; teste a restauração.
- Não remova originais locais ao mudar para R2 sem migração e backup verificados.
- CDN e domínio público são opcionais e devem preservar a autorização privada.

Consulte [propriedade e responsabilidade do conteúdo](../concepts/content-responsibility/) antes de importar ou disponibilizar qualquer coleção.
