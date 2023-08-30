import { PrismockClient } from "prismock";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CreateSpecialtyService } from "./";
import { PrismaSpecialtiesRepository } from "../repositories/prisma";
import { clearMockDatabase } from "../repositories/utils";

vi.mock("@prisma/client", () => ({
  PrismaClient: PrismockClient,
}));

describe("Create specialty", () => {
  const sut = new CreateSpecialtyService(new PrismaSpecialtiesRepository());

  beforeEach(() => {
    clearMockDatabase();
  });

  it("should be able to create a specialty", async () => {
    const specialty = {
      description: "Cardiologist",
    };

    const createdSpecialty = await sut.execute(specialty);

    expect(createdSpecialty.id).toEqual(expect.any(String));
  });
});
