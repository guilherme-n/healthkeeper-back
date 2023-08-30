import { PrismockClient } from "prismock";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CreateSpecialtyService } from "./";
import { PrismaSpecialtiesRepository } from "../repositories/prisma";

describe("Create specialty", () => {
  let sut: CreateSpecialtyService;

  vi.mock("@prisma/client", () => ({
    PrismaClient: PrismockClient,
  }));

  beforeEach(() => {
    sut = new CreateSpecialtyService(new PrismaSpecialtiesRepository());
  });

  it("should be able to create a specialty", async () => {
    const specialty = {
      description: "Cardiologist",
    };

    const createdSpecialty = await sut.execute(specialty);

    expect(createdSpecialty.id).toEqual(expect.any(String));
  });
});
