import { beforeEach, describe, expect, it } from "vitest";
import { LocalGameRepository } from "./game-repository";

describe("LocalGameRepository", () => {
  let repository: LocalGameRepository;
  beforeEach(() => { repository = new LocalGameRepository(); });
  it("creates the same daily set for the same date", async () => {
    expect((await repository.daily("2026-08-31")).imageIds).toEqual((await repository.daily("2026-08-31")).imageIds);
  });
  it("scores a guess on the server and prevents duplicate answers", async () => {
    const session = await repository.createSession("STANDARD", ["chicken"]);
    expect((await repository.submitGuess(session.id, "chicken", "REAL", 1000)).correct).toBe(true);
    await expect(repository.submitGuess(session.id, "chicken", "FAKE", 1000)).rejects.toThrow("ALREADY_ANSWERED");
  });
});
