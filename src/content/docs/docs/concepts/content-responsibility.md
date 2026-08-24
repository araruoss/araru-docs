---
title: Content ownership and responsibility
description: Understand the self-hosted boundary and the operator's responsibility for files, access, and backups.
order: 2
section: concepts
status: stable
---

Araru is entirely self-hosted. Araru OSS publishes software and documentation, but does not operate a cloud library or a hosting service for user content.

## What Araru OSS does not provide

The Araru project does not host, upload, receive, curate, sell, license, or distribute books, comics, manga, magazines, documents, audiobooks, or any other media read by an Araru installation. The project has no access to the operator's private library unless that operator independently chooses to expose their own server.

The software does not include a catalog of copyrighted works and does not grant rights to content. Installing Araru does not authorize copying, sharing, circumventing DRM, or making a file available beyond the permissions attached to that file.

## Operator responsibility

The person or organization operating an installation is responsible for:

- obtaining every file through an official, legitimate, or otherwise authorized source;
- confirming that storage and access comply with the applicable license and local law;
- configuring the storage provider, Server, network, users, and permissions;
- limiting access to the operator's own network and authorized users;
- protecting credentials, TLS termination, hosts, volumes, and external providers;
- retaining original files independently from Araru-generated metadata, covers, indexes, and caches.

After the operator supplies an authorized file, their own Araru installation can index it and make it available to authorized readers on the network controlled by that operator. This is the operator's hosting activity, not a hosting service provided by Araru OSS.

## Backups are mandatory operational work

Araru is not the only copy of a collection and must not be treated as a backup provider. Keep recoverable copies of:

1. the original, officially acquired files;
2. PostgreSQL application state;
3. persistent configuration and secrets required for recovery;
4. any non-reconstructible storage-provider state.

Keep at least one backup outside the active host and test restoration periodically. Redis caches, search derivatives, generated thumbnails, and other reconstructible data are not substitutes for the originals.

Removing Araru, losing a volume, corrupting a host, or misconfiguring a provider can make the active installation unavailable. Recovery remains the operator's responsibility.

## Private-network expectation

The safest default is access only through a trusted private network or a properly secured private tunnel. If an operator exposes Araru to the public internet, they assume responsibility for authentication, authorization, HTTPS, updates, monitoring, rate controls, firewall policy, legal compliance, and incident response.

Araru being open source and self-hosted does not make the files public. It gives the operator control—and the corresponding responsibility—over where the files live and who can access them.
