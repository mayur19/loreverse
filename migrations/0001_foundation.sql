CREATE TABLE universes (
  id uuid PRIMARY KEY,
  owner_id uuid NOT NULL,
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  visibility text NOT NULL CHECK (visibility IN ('PUBLIC','UNLISTED','PRIVATE')),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE lore_entities (
  id uuid PRIMARY KEY,
  universe_id uuid NOT NULL REFERENCES universes(id),
  slug text NOT NULL,
  entity_type text NOT NULL,
  visibility text NOT NULL,
  state text NOT NULL,
  version integer NOT NULL DEFAULT 1,
  UNIQUE (universe_id, slug)
);

CREATE TABLE lore_revisions (
  id uuid PRIMARY KEY,
  entity_id uuid NOT NULL REFERENCES lore_entities(id),
  revision_number integer NOT NULL,
  author_id uuid NOT NULL,
  title text NOT NULL,
  summary text NOT NULL,
  body_markdown text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (entity_id, revision_number)
);

CREATE TABLE releases (
  id uuid PRIMARY KEY,
  universe_id uuid NOT NULL REFERENCES universes(id),
  label text NOT NULL,
  published_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (universe_id, label)
);

CREATE TABLE release_entries (
  release_id uuid NOT NULL REFERENCES releases(id),
  entity_id uuid NOT NULL REFERENCES lore_entities(id),
  revision_id uuid NOT NULL REFERENCES lore_revisions(id),
  public_slug text NOT NULL,
  PRIMARY KEY (release_id, entity_id)
);

