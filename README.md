# LoreVerse

**Collaborative worldbuilding with deliberate canon releases.** Turn scattered lore documents into
a living, explorable universe with clear revision history and contribution ownership.

LoreVerse is an open-source workspace for writing groups, tabletop communities and independent
studios. Creators structure characters, places, factions, artifacts, events and concepts, connect
them through chronology and relationships, and publish selected revisions for readers without
exposing unfinished material.

> **Project status: early foundation.** Structured lore entries, immutable revisions, stale-write
> protection and public-release snapshots are implemented and tested. The remaining work is
> documented and tracked in the [ticket index](docs/TICKETS.md): approximately 10% of the planned
> product is complete.

## Project status

| Area | Status | Tickets |
| --- | --- | --- |
| Repository standards, MIT license and continuous checks | Implemented | Foundation |
| Structured entity domain and slug validation | Implemented | Foundation |
| Immutable revisions and optimistic conflict detection | Implemented | Foundation |
| Approval and release-snapshot rules | Implemented | Foundation |
| Initial HTTP boundary and PostgreSQL migration | Implemented | Foundation |
| Accounts, sessions, membership and durable repositories | Pending | LV-101 – LV-104 |
| Creator workspace, custom fields, aliases and tags | Pending | LV-105 – LV-110 |
| Relations, graph and chronology | Pending | LV-111 – LV-116 |
| Contribution proposals and editorial review | Pending | LV-117 – LV-119 |
| Release composer and validation | Pending | LV-120 – LV-122 |
| Public reader, spoilers and collections | Pending | LV-123 – LV-126 |
| Audit, portability, moderation and release readiness | Pending | LV-127 – LV-130 |

## Quick start

Requirements: Node.js 22 or later and npm.

    npm install
    npm run dev

Open:

- Web: <http://localhost:3101>
- Health endpoint: <http://localhost:3101/api/health>

The current slice uses an in-process repository so the revision and publication rules can be
exercised without local infrastructure. PostgreSQL persistence is tracked by LV-102.

## Demo access (development only)

No account system or demo credentials exist yet. The landing page and health endpoint are public
in the local process. Entity creation is available through POST /api/entities for development
verification only; authenticated universe membership arrives in LV-101 through LV-104.

## Commands

| Command | What it does |
| --- | --- |
| npm run dev | Start the local server with file watching |
| npm test | Run all domain and request tests once |
| npm run test:watch | Run tests in watch mode |
| npm run typecheck | Check strict TypeScript without emitting files |
| npm run build | Compile the production server into dist |
| npm start | Run the compiled server |

## Tech stack

| Layer | Choice |
| --- | --- |
| Language | TypeScript in strict mode on Node.js 22+ |
| API | Express 5 with zod request validation |
| Data model | PostgreSQL forward migration plus repository boundary |
| Domain | Structured entities, revisions, approval and release snapshots |
| Web | Accessible static foundation page served by Express |
| Tests | Vitest and Supertest |
| Checks | GitHub Actions for type checks, tests and sensitive-data scanning |

## Repository layout

    loreverse/
    ├── src/
    │   ├── app.ts             Express boundary and response handling
    │   ├── domain.ts          entities, revisions and release rules
    │   └── server.ts          process entry point
    ├── test/                  domain and request tests
    ├── migrations/            PostgreSQL foundation schema
    ├── public/                initial public landing page
    ├── docs/
    │   ├── ARCHITECTURE.md    boundaries and delivery gates
    │   ├── ROADMAP.md         milestone sequence
    │   └── TICKETS.md         complete implementation index
    └── .github/               checks and issue template

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Delivery roadmap](docs/ROADMAP.md)
- [Implementation ticket index](docs/TICKETS.md)
- [Product requirements](https://github.com/mayur19/loreverse/issues/1)
- [Public issue tracker](https://github.com/mayur19/loreverse/issues)

## Known limitations

- State is currently process-local; restarting clears development entries.
- Authentication, universe membership and role enforcement are pending.
- Relations, chronology, proposals and the reader experience are not built.
- The migration establishes the storage contract but is not yet connected to the HTTP service.
- The landing page is a foundation preview, not the final creator workspace.

## Contributing, security and license

- [Contributing guide](CONTRIBUTING.md): workflow and verification expectations.
- [Security policy](SECURITY.md): private vulnerability reporting.
- [Community conduct](CODE_OF_CONDUCT.md).
- Licensed under the [MIT License](LICENSE).

