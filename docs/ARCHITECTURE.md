# Architecture

LoreVerse begins as a modular monolith with an HTTP service, domain modules and PostgreSQL.

## Boundaries

- **HTTP:** validation, authentication context and safe response shapes.
- **Domain:** revisions, relations, proposals, releases and spoiler policy.
- **Persistence:** tenant-scoped repositories and forward-only migrations.
- **Reader:** release-only queries that never join draft content.

Published releases reference exact revision identifiers. Later edits create new revisions and cannot mutate a reader's view of an older release. Every future repository query must require a universe identifier, and public queries must begin from a published release.

## Delivery gates

A change is complete only when domain tests, request tests, migration review, access-control checks and documentation all agree.

