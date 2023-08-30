import { beforeEach, describe, it, vi } from "vitest";
import { CreateProfessionalService } from "./";
import { PrismockClient } from "prismock";
import { PrismaProfessionalsRepository } from "../repositories/prisma";

describe("Create professional service", () => {
  let sut: CreateProfessionalService;

  vi.mock("@prisma/client", () => ({
    PrismaClient: PrismockClient,
  }));

  beforeEach(() => {
    sut = new CreateProfessionalService(new PrismaProfessionalsRepository());
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
