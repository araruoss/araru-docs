---
title: Readers
description: Supported formats and shared reading behavior.
sidebar:
  order: 1
---

| Format | Current engine |
| --- | --- |
| PDF | PDF.js with HTTP Range and internal page rendering |
| EPUB | archive/parser pipeline rendered by the Web client |
| MOBI | parser pipeline with format limitations |
| CBZ | indexed ZIP images |
| CBR | indexed RAR images |

All engines share navigation, progress, cleanup, memory-budget, responsive layout, and reader telemetry contracts. Large files should be streamed or fetched in ranges rather than loaded entirely. See [formats](formats/) and [performance/progress](performance-and-progress/).
