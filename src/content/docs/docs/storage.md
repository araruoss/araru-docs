---
title: "Storage configuration"
description: "Detailed configuration and operation guide for Local, Google Drive, and Cloudflare R2 providers."
order: 100
section: "storage"
status: stable
---

Araru separates catalog metadata from file bytes. PostgreSQL stores the stable Library, Source, file identity, and provider metadata; the selected provider stores the original content. This allows the server and Web repositories to remain independent and avoids exposing physical paths or provider credentials to the browser.

## Library, source, and provider

A **Library** is the logical catalog and authorization boundary. A **Source** belongs to one Library and points to a configured **StorageProvider** connection. Every indexed `library_file` records both `library_id` and `library_source_id`; authorization uses the Library ID rather than the legacy provider/source label.

The Server provisions default Local, Google Drive, and Cloudflare R2 bindings during the PostgreSQL migration. Additional enabled Sources can be managed through the administrative API. A source scan or provider failure must not mark files from another Source as missing.

## Provider overview

| Provider | Enablement | Read | Write | Best fit |
| --- | --- | --- | --- | --- |
| Local filesystem | `LOCAL_LIBRARY_DIR` and a Local Source | Stream and HTTP Range | Operator-managed | Development, single-host deployments, existing libraries |
| Google Drive | `ENABLE_GOOGLE_DRIVE=true`, credentials, and a Drive Source | OAuth/API, stream and Range | Not used by the catalog flow | Existing Drive libraries and incremental synchronization |
| Cloudflare R2 | R2 credentials and an R2 Source | Stream, Range, signed read | Signed upload, put, multipart, delete | Private object storage and horizontally replaceable disks |

Provider credentials and connections remain installation-managed, while the catalog relationship is explicit per Library and Source. Changing a Source or provider does not automatically migrate objects.

## Local filesystem

Set:

```dotenv
STORAGE_PROVIDER=local
DATA_DIR=storage
LOCAL_LIBRARY_DIR=storage/pdfs
COVER_CACHE_DIR=storage/cache/covers
```

Place supported files under `LOCAL_LIBRARY_DIR`. The library watcher and scheduled catalog refresh discover files and persist their identity in PostgreSQL. Keep this directory on a persistent volume and grant the server read access. The server writes generated covers and temporary work files separately.

Recommended layout:

```text
storage/
├── pdfs/                 # original library files
├── cache/covers/         # derived, disposable covers
├── drive-folders.json    # optional Drive category mapping
├── categorias.json       # optional manual metadata
└── .araru-admin-bootstrap.json
```

Back up `pdfs/` separately from PostgreSQL. A database backup without the original files cannot restore the content bytes.

## Google Drive

### OAuth setup

1. Create or select a project in Google Cloud.
2. Enable the Google Drive API.
3. Configure the OAuth consent screen and add the installation administrators as test users when the application is in testing mode.
4. Create a Web OAuth client.
5. Add the exact callback URL from `GOOGLE_REDIRECT_URI`; for local development it is normally `http://localhost:3001/api/v1/auth/callback`.
6. Set the credentials on the server only:

```dotenv
ENABLE_GOOGLE_DRIVE=true
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_REDIRECT_URI=https://api.example.com/api/v1/auth/callback
DRIVE_FOLDER_ID=your-root-folder-id
DRIVE_REQUEST_TIMEOUT=15000
DRIVE_CONCURRENCY=6
APP_ACCESS_SECRET=long-random-secret
```

The Drive OAuth scope is read-only. The token state is stored encrypted under `DATA_DIR`; preserve `APP_ACCESS_SECRET` or the encrypted token state cannot be used after restart.

For public resources, `GOOGLE_API_KEY` can be used instead of OAuth. API-key access does not replace OAuth for private Drive files.

### Folder mapping and synchronization

`DRIVE_FOLDER_ID` selects a root folder. `DRIVE_FOLDERS_CONFIG` can provide additional folder/category rules. The server paginates Drive listing, keeps an incremental change cursor, handles removed files, retries transient failures, and uses a circuit breaker for repeated provider failures. `DRIVE_REQUEST_TIMEOUT` and `DRIVE_CONCURRENCY` should be reduced on small installations or increased only after measuring provider quotas.

Drive content is streamed and supports HTTP Range where the provider allows it. Large MOBI/CBR resources are not converted to an in-memory buffer unnecessarily.

## Cloudflare R2

### Create the bucket and API token

1. Create an R2 bucket in the Cloudflare account that owns the installation.
2. Keep the bucket private; do not enable public object access as a shortcut for application delivery.
3. Create an R2 API token restricted to the required bucket and operations. For read-only deployments, grant read/list only. For admin uploads, grant the minimum write/delete/multipart permissions needed.
4. Copy the S3-compatible endpoint shown by Cloudflare. It normally has the form `https://<account-id>.r2.cloudflarestorage.com`.
5. Store the access key and secret in the server secret manager or process environment.

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

The server refuses to construct the R2 provider when `R2_ENDPOINT`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, or `R2_BUCKET` is missing. `R2_PUBLIC_URL` is optional and should remain empty for private delivery.

### Object keys and catalog identity

R2 keys are opaque provider keys, not filesystem paths. Uploads created through the administrative flow use an `uploads/<unique-id>/...` prefix. After completion, the server performs a `HEAD` request and records size, MIME type, ETag/checksum, provider, and key in `library_files`. PostgreSQL remains the source of truth for catalog identity.

### Upload and delivery flows

The protected `POST /api/v1/admin/storage/r2/upload-url` endpoint requires `libraryId` and `librarySourceId`, then returns a short-lived signed `PUT` URL and object key. The client uploads directly to R2, then calls `POST /api/v1/admin/storage/r2/complete` with the same binding. The server validates the active Library/Source and key prefix, performs `HEAD`, and indexes the object metadata under that Source.

For direct private delivery, an authenticated client can request `GET /api/v1/works/:id/content/url`. The returned URL is temporary and must not be persisted in the database or logged. Normal content delivery remains available through `GET /api/v1/works/:id/content`, with `Range`, `ETag`, `Last-Modified`, and `HEAD` support.

Multipart methods are available in the R2 provider for large uploads: create, upload part, complete, and abort. An application integrating multipart must retain the upload ID and part ETags until completion, and must abort abandoned uploads according to its operational policy.

## Health and operations

- `/live` is the lightweight liveness check; `/ready` verifies PostgreSQL and configured storage dependencies.
- `/health/details` is administrative and reports provider configuration/health; keep it authenticated and private.
- The Admin operations page exposes storage status along with jobs, cache, integrity, and circuit-breaker information.
- Monitor object count, storage usage, request errors, 403/404 rates, and signed URL failures in the provider dashboard.

## Security and backup checklist

- Never expose R2 credentials, OAuth client secrets, refresh tokens, or signed URLs in Web configuration or logs.
- Use exact CORS origins and HTTPS in production.
- Grant R2 tokens only the bucket and operations required by the deployment.
- Back up PostgreSQL and original provider content independently; test restoration.
- Do not delete local originals after switching to R2 unless an explicit, verified migration and backup procedure exists.
- Adding a CDN or public custom domain is optional and must preserve private authorization semantics.

See [content ownership and responsibility](../concepts/content-responsibility/) before importing or serving any collection.
