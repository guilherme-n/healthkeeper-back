import { beforeEach, describe, it, vi } from "vitest";
import { CreateProfessionalService } from "./";
import PrismockClient from "prismock";
import { PrismaProfessionalsRepository } from "../repositories/prisma";
import { Prisma } from "@prisma/client";

describe("Create professional service", () => {
  let sut: CreateProfessionalService;

  vi.mock("@prisma/client", async () => {
    const prismock: typeof PrismockClient = await vi.importActual("prismock");

    return {
      ...vi.importActual("@prisma/client"),
      PrismaClient: prismock.PrismockClient,
    };
  });

  beforeEach(() => {
    sut = new CreateProfessionalService(new PrismaProfessionalsRepository());
  });

  it("should be able to create a professional", async () => {
    const specialty: Prisma.SpecialtyCreateInput = {
      description: "Cardiologist",
    };

    const professional: Prisma.ProfessionalCreateInput = {
      name: "John doctor",
      specialty: {
        create: {
          description: "Cardiologist",
        },
      },
      user: {
        create: {
          name: "John Doe",
          email: "johndoe@email.com",
          password: "password",
        },
      },
    };
  });
});
