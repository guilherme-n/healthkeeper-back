import { clearMockDatabase } from "@/repositories/utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { makeSearchSpecialtiesService } from "./factories";

vi.mock("@prisma/client");

describe("Search specialties", () => {
  const sut = makeSearchSpecialtiesService();

  beforeEach(() => clearMockDatabase());

  it("should be able to search all specialties by user", async () => {
    const specialties = await sut.execute({
      userId: "e5a52e72-de26-4798-8416-63565e200808",
    });

    expect(specialties).toHaveLength(2);
  });
});
