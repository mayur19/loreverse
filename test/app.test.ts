import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";

describe("HTTP boundary", () => {
  it("creates a valid entity and rejects malformed input", async () => {
    const app = createApp();
    const created = await request(app).post("/api/entities").send({
      universeId: "u1", slug: "signal-keeper", type: "CHARACTER", visibility: "PUBLIC",
      title: "Signal Keeper", summary: "", body: "Listens.", authorId: "owner"
    });
    expect(created.status).toBe(201);
    const invalid = await request(app).post("/api/entities").send({ slug: "Invalid Slug" });
    expect(invalid.status).toBe(422);
  });
});

