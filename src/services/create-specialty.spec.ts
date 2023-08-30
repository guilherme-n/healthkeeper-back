import PrismockClient from "prismock";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CreateSpecialtyService } from "./";
import { PrismaSpecialtiesRepository } from "../repositories/prisma";
import { Prisma } from "@prisma/client";

describe("Create specialty", () => {
  let sut: CreateSpecialtyService;

  vi.mock("@prisma/client", async () => {
    const prismock: typeof PrismockClient = await vi.importActual("prismock");

    return {
      ...vi.importActual("@prisma/client"),
      PrismaClient: prismock.PrismockClient,
    };
  });

  beforeEach(() => {
    sut = new CreateSpecialtyService(new PrismaSpecialtiesRepository());
  });

  it("should be able to create a specialty", async () => {
    const specialty: Prisma.SpecialtyCreateInput = {
      description: "Cardiologist",
    };

    const createdSpecialty = await sut.execute(specialty);

    expect(createdSpecialty.id).toEqual(expect.any(String));
  });
});
