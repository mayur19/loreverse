# Implementation ticket index

The public issue tracker contains full scope, acceptance criteria, dependencies and verification notes for every item.

- [ ] LV-101 | Foundation | backend,security | Add local account sessions and password storage | Establish revocable cookie sessions, username normalization and rate-limited sign-in.
- [ ] LV-102 | Foundation | backend,database | Implement PostgreSQL repositories and migration runner | Replace the in-process catalog while preserving domain behavior and transactional writes.
- [ ] LV-103 | Foundation | security,testing | Enforce universe-scoped authorization | Prove every draft, revision and file query checks membership and role.
- [ ] LV-104 | Foundation | backend | Add universe creation and lifecycle | Support public, unlisted, private and archived universes with stable slugs.
- [ ] LV-105 | Creator workspace | frontend | Build creator shell and universe switcher | Provide accessible navigation, empty states and role-aware actions.
- [ ] LV-106 | Creator workspace | backend,frontend | Build structured entity editor | Support all six entity types, explicit saves and conflict recovery.
- [ ] LV-107 | Creator workspace | backend,database | Add custom field definitions and values | Validate type-specific values and preserve them per revision.
- [ ] LV-108 | Creator workspace | backend,frontend | Add aliases, tags and filtering | Provide tenant-scoped normalization, merge behavior and useful library filters.
- [ ] LV-109 | Creator workspace | backend | Add immutable revision comparison and restore | Compare fields and restore an old version as a new revision.
- [ ] LV-110 | Creator workspace | testing | Cover optimistic concurrency end to end | Verify simultaneous edits never overwrite silently.
- [ ] LV-111 | Connections | backend,database | Implement relation types and relation revisions | Support directed, inverse and symmetric relationships with source snapshots.
- [ ] LV-112 | Connections | backend,testing | Validate relationship invariants | Reject forbidden self-links, broken endpoints and place hierarchy cycles.
- [ ] LV-113 | Connections | frontend | Build relation editor and accessible relationship list | Make connection creation and inspection usable without a visual graph.
- [ ] LV-114 | Connections | frontend | Build bounded relationship graph | Add focus, filters, expansion limits and equivalent list semantics.
- [ ] LV-115 | Chronology | backend,database | Implement eras and sortable fictional dates | Support exact, partial and ordered fictional chronology.
- [ ] LV-116 | Chronology | frontend | Build timeline exploration | Group events deterministically with era and spoiler filters.
- [ ] LV-117 | Editorial | backend,database | Implement contribution proposal snapshots | Support new-entry, edit, relation and event proposals without mutating canon.
- [ ] LV-118 | Editorial | backend,frontend | Build proposal comparison and review rounds | Preserve submitted snapshots, comments and every decision.
- [ ] LV-119 | Editorial | backend | Enforce proposal state transitions | Validate submit, request changes, accept, reject and withdraw permissions.
- [ ] LV-120 | Publishing | backend,database | Build release composer and immutable manifests | Freeze exact entity and relation revision identifiers.
- [ ] LV-121 | Publishing | backend,testing | Add release validation engine | Block private notes, broken links, duplicate slugs and missing parents.
- [ ] LV-122 | Publishing | frontend | Build release preview and confirmation | Show the exact public result and blocking validation details.
- [ ] LV-123 | Reader | backend,security | Implement release-only public query layer | Prevent drafts and editor-only fields from entering any public response.
- [ ] LV-124 | Reader | backend,frontend | Add server-enforced spoiler preferences | Apply spoiler level to pages, search, graph and timeline.
- [ ] LV-125 | Reader | frontend | Build public universe and entity pages | Provide stable URLs, old-release browsing and accessible reading.
- [ ] LV-126 | Reader | backend,frontend | Add collections, follows and reading progress | Support curated order and per-account saved state.
- [ ] LV-127 | Operations | backend | Add notifications, audit history and reports | Record safe events without copying hidden lore into logs.
- [ ] LV-128 | Portability | backend,testing | Implement versioned export and validated import | Preserve revisions, relations, media references and stable keys.
- [ ] LV-129 | Quality | testing,security | Complete isolation, spoiler and release browser suite | Automate the product requirements acceptance matrix with deterministic reset.
- [ ] LV-130 | Release | accessibility,devops | Finish accessibility, performance and deployment readiness | Meet keyboard, contrast, responsive, backup and runbook gates.

