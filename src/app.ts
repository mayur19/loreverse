import express from "express";
import { z } from "zod";
import { LoreCatalog } from "./domain.js";

const entityInput = z.object({
  universeId: z.string().min(1),
  slug: z.string().min(1),
  type: z.enum(["CHARACTER", "PLACE", "FACTION", "ARTIFACT", "EVENT", "CONCEPT"]),
  visibility: z.enum(["PUBLIC", "MEMBERS_ONLY", "EDITORS_ONLY"]),
  title: z.string().min(1).max(120),
  summary: z.string().max(500),
  body: z.string().max(50000),
  authorId: z.string().min(1)
});

export function createApp(catalog = new LoreCatalog()) {
  const app = express();
  app.use(express.json({ limit: "256kb" }));
  app.use(express.static("public"));
  app.get("/api/health", (_request, response) => response.json({ status: "ok" }));
  app.post("/api/entities", (request, response) => {
    const parsed = entityInput.safeParse(request.body);
    if (!parsed.success) return response.status(422).json({ error: "VALIDATION_FAILED", details: parsed.error.issues });
    try {
      return response.status(201).json({ data: catalog.createEntity(parsed.data) });
    } catch (error) {
      const code = error instanceof Error ? error.message : "UNKNOWN";
      return response.status(code === "SLUG_CONFLICT" ? 409 : 422).json({ error: code });
    }
  });
  app.get("/api/entities/:id", (request, response) => {
    const entity = catalog.entities.get(request.params.id);
    if (!entity) return response.status(404).json({ error: "NOT_FOUND" });
    return response.json({ data: entity });
  });
  return app;
}

