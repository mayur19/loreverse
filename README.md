# LoreVerse

LoreVerse is an open-source home for collaborative fictional universes. Creators structure lore, preserve revision history and publish explicit canon releases for readers.

## Current foundation

The repository contains the first product slice:

- structured lore entities;
- immutable revisions with stale-write protection;
- approval and public-release snapshot rules;
- a typed HTTP boundary;
- a PostgreSQL foundation migration;
- unit and request-level tests;
- an initial public landing page.

The remaining product is specified in [the roadmap](docs/ROADMAP.md) and tracked as public issues.

## Run locally

Requires Node.js 22 or later.

```sh
npm install
npm test
npm run dev
```

Open http://localhost:3101. No account identifiers, credentials or private configuration are committed.

## Principles

- Published lore is an immutable snapshot.
- Hidden material is removed at the server boundary.
- Contribution history keeps attribution intact.
- Exports remain portable and documented.

## Project status

Early foundation. APIs and data structures may change before the first stable release.

## License

MIT

