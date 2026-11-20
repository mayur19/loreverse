import { describe, expect, it } from "vitest";
import { LoreCatalog } from "../src/domain.js";

const input = {
  universeId: "glass-meridian",
  slug: "mara-venn",
  type: "CHARACTER" as const,
  visibility: "PUBLIC" as const,
  title: "Mara Venn",
  summary: "A pilot between worlds.",
  body: "Mara follows signals through the Meridian.",
  authorId: "owner"
};

describe("LoreCatalog", () => {
  it("preserves immutable revision history and rejects stale writes", () => {
    const catalog = new LoreCatalog();
    const entity = catalog.createEntity(input);
    const revised = catalog.revise(entity.id, 1, { ...input, title: "Captain Mara Venn" });
    expect(revised.revisions).toHaveLength(2);
    expect(revised.revisions[0]?.title).toBe("Mara Venn");
    expect(() => catalog.revise(entity.id, 1, input)).toThrow("REVISION_CONFLICT");
  });

  it("publishes an approved public revision snapshot", () => {
    const catalog = new LoreCatalog();
    const entity = catalog.createEntity(input);
    catalog.approve(entity.id);
    const release = catalog.publish(input.universeId, "1.0", [entity.id]);
    expect(release.entries[0]?.revisionId).toBe(entity.revisions[0]?.id);
    catalog.revise(entity.id, 1, { ...input, title: "Changed later" });
    expect(release.entries[0]?.revisionId).toBe(entity.revisions[0]?.id);
  });

  it("refuses private entries in a public release", () => {
    const catalog = new LoreCatalog();
    const entity = catalog.createEntity({ ...input, slug: "secret", visibility: "EDITORS_ONLY" });
    catalog.approve(entity.id);
    expect(() => catalog.publish(input.universeId, "1.0", [entity.id])).toThrow("NOT_PUBLISHABLE");
  });
});

