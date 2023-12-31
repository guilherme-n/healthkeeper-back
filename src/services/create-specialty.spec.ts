import { beforeEach, describe, expect, it, vi } from "vitest";
import { clearMockDatabase } from "@/repositories/utils";
import { SpecialtyAlreadyRegisteredError } from "./errors";
import { makeCreateSpecialtyService } from "./factories";

vi.mock("@prisma/client");

describe("Create specialty", () => {
  const sut = makeCreateSpecialtyService();

  beforeEach(() => clearMockDatabase());

  it("should be able to create a specialty", async () => {
    const specialty = {
      description: "Dentist",
      user_id: "e5a52e72-de26-4798-8416-63565e200808",
    };

    const createdSpecialty = await sut.execute(specialty);

    expect(createdSpecialty.id).toEqual(expect.any(String));
  });

  it("should throw an error if specialty already exists", async () => {
    const specialty = {
      description: "Cardiologist",
      user_id: "e5a52e72-de26-4798-8416-63565e200808",
    };

    expect(sut.execute(specialty)).rejects.toThrowError(
      SpecialtyAlreadyRegisteredError,
    );
  });
});
