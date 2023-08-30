import { PrismockClient } from "prismock";
import { beforeEach, describe, it, vi } from "vitest";
import { CreateProfessionalService } from "./";
import { PrismaProfessionalsRepository } from "../repositories/prisma";
import { clearMockDatabase } from "../repositories/utils";

vi.mock("@prisma/client", () => ({
  PrismaClient: PrismockClient,
}));

describe("Create professional service", () => {
  const sut = new CreateProfessionalService(
    new PrismaProfessionalsRepository(),
  );

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
