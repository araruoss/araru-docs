---
title: Getting Started
description: Run Araru and complete the first setup.
sidebar:
  order: 1
---

## Requirements

- Docker Engine with Compose v2;
- a directory containing your books and documents;
- persistent space for PostgreSQL, Redis, and generated covers.

## Quick start

```bash
cd ~/Documents/projects/araruoss/runtime
make setup
# Set a strong POSTGRES_PASSWORD in .env
make up
make health
```

Open `http://localhost:8080`. The first-run wizard creates the administrator, initial profile, language, and global theme. Setup is transactional and cannot run again after completion.

Place supported files in `runtime/storage/pdfs`, preserving folders to define categories. Tags do not define category hierarchy.

Review [administration](../admin/) and [storage](../storage/), configure HTTPS before public exposure, and back up PostgreSQL and persistent storage.
