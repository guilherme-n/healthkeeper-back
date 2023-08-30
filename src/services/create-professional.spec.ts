import { PrismockClient } from "prismock";
import { beforeAll, beforeEach, describe, it, vi } from "vitest";
import { CreateProfessionalService } from "./";
import { PrismaProfessionalsRepository } from "../repositories/prisma";
import { clearMockDatabase } from "../repositories/utils";

describe("Create professional service", () => {
  let sut: CreateProfessionalService;

  vi.mock("@prisma/client", () => ({
    PrismaClient: PrismockClient,
  }));

  beforeAll(() => {
    sut = new CreateProfessionalService(new PrismaProfessionalsRepository());
  });

  beforeEach(() => {
    clearMockDatabase();
  });

  it("should be able to create a professional", async () => {
    const specialty = {
      description: "Cardiologist",
    };

    const professional = {
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
