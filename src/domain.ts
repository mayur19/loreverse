import { randomUUID } from "node:crypto";

export type Visibility = "PUBLIC" | "MEMBERS_ONLY" | "EDITORS_ONLY";
export type EntityState = "DRAFT" | "APPROVED" | "PUBLISHED" | "ARCHIVED";

export interface LoreRevision {
  id: string;
  number: number;
  title: string;
  summary: string;
  body: string;
  authorId: string;
  createdAt: string;
}

export interface LoreEntity {
  id: string;
  universeId: string;
  slug: string;
  type: "CHARACTER" | "PLACE" | "FACTION" | "ARTIFACT" | "EVENT" | "CONCEPT";
  visibility: Visibility;
  state: EntityState;
  revisions: LoreRevision[];
}

export interface Release {
  id: string;
  universeId: string;
  label: string;
  entries: ReadonlyArray<{ entityId: string; revisionId: string; slug: string }>;
  publishedAt: string;
}

export class LoreCatalog {
  readonly entities = new Map<string, LoreEntity>();
  readonly releases = new Map<string, Release>();

  createEntity(input: {
    universeId: string;
    slug: string;
    type: LoreEntity["type"];
    visibility: Visibility;
    title: string;
    summary: string;
    body: string;
    authorId: string;
  }): LoreEntity {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input.slug)) {
      throw new Error("INVALID_SLUG");
    }
    if ([...this.entities.values()].some((item) => item.universeId === input.universeId && item.slug === input.slug)) {
      throw new Error("SLUG_CONFLICT");
    }
    const entity: LoreEntity = {
      id: randomUUID(),
      universeId: input.universeId,
      slug: input.slug,
      type: input.type,
      visibility: input.visibility,
      state: "DRAFT",
      revisions: [
        {
          id: randomUUID(),
          number: 1,
          title: input.title.trim(),
          summary: input.summary.trim(),
          body: input.body.trim(),
          authorId: input.authorId,
          createdAt: new Date().toISOString()
        }
      ]
    };
    this.entities.set(entity.id, entity);
    return structuredClone(entity);
  }

  revise(entityId: string, expectedRevision: number, patch: Pick<LoreRevision, "title" | "summary" | "body" | "authorId">): LoreEntity {
    const entity = this.entities.get(entityId);
    if (!entity) throw new Error("NOT_FOUND");
    const current = entity.revisions.at(-1)!;
    if (current.number !== expectedRevision) throw new Error("REVISION_CONFLICT");
    entity.revisions.push({
      id: randomUUID(),
      number: current.number + 1,
      title: patch.title.trim(),
      summary: patch.summary.trim(),
      body: patch.body.trim(),
      authorId: patch.authorId,
      createdAt: new Date().toISOString()
    });
    entity.state = "DRAFT";
    return structuredClone(entity);
  }

  approve(entityId: string): LoreEntity {
    const entity = this.entities.get(entityId);
    if (!entity) throw new Error("NOT_FOUND");
    entity.state = "APPROVED";
    return structuredClone(entity);
  }

  publish(universeId: string, label: string, entityIds: string[]): Release {
    if (entityIds.length === 0) throw new Error("EMPTY_RELEASE");
    const selected = entityIds.map((id) => {
      const entity = this.entities.get(id);
      if (!entity || entity.universeId !== universeId) throw new Error("INVALID_RELEASE_MEMBER");
      if (entity.state !== "APPROVED" || entity.visibility !== "PUBLIC") throw new Error("NOT_PUBLISHABLE");
      return entity;
    });
    const release: Release = {
      id: randomUUID(),
      universeId,
      label,
      entries: selected.map((entity) => ({
        entityId: entity.id,
        revisionId: entity.revisions.at(-1)!.id,
        slug: entity.slug
      })),
      publishedAt: new Date().toISOString()
    };
    selected.forEach((entity) => { entity.state = "PUBLISHED"; });
    this.releases.set(release.id, release);
    return structuredClone(release);
  }
}

