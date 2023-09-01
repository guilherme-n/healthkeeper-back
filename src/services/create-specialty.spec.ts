import { describe, expect, it, vi } from "vitest";
import { CreateSpecialtyService } from "./";
import { PrismaSpecialtiesRepository } from "../repositories/prisma";

vi.mock("@prisma/client");

describe("Create specialty", () => {
  const sut = new CreateSpecialtyService(new PrismaSpecialtiesRepository());

  it("should be able to create a specialty", async () => {
    const specialty = {
      description: "Cardiologist",
      user_id: "123",
    };

    const createdSpecialty = await sut.execute(specialty);

    expect(createdSpecialty.id).toEqual(expect.any(String));
  });
});
