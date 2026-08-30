---
title: "Code guidelines for agents"
description: "Documentation for Code guidelines for agents in the Araru ecosystem."
order: 100
section: "llm"
status: stable
---

Backend: maintain route/controller/service; use structured logger; normalize errors; validate payload/paths; stream when possible; use transactions; add migration; integrate long jobs to queue.

Frontend: use API client/TanStack Query; URL for navigation; avoid duplicating global state; handle loading/error/empty; preserve touch/mobile/focus; perform cleanup in effects/readers; lazy load heavy areas.

Before creating abstraction, look for existing implementation with `rg`. Make the smallest coherent change. Do not reformat unrelated files or alter data in `storage`.
