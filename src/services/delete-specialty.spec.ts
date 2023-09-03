import { clearMockDatabase } from "@/repositories/utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  makeCreateSpecialtyService,
  makeDeleteSpecialtyService,
  makeGetSpecialtyService,
} from "./factories";
import { ForeignKeyConstraintError } from "./errors/foreign-key-constraint-error";

vi.mock("@prisma/client");

describe("Delete specialty", () => {
  const sut = makeDeleteSpecialtyService();
  const createSpecialtyService = makeCreateSpecialtyService();
  const getSpecialtyService = makeGetSpecialtyService();

  beforeEach(() => {
    clearMockDatabase();
  });

  it("should be able to delete a specialty", async () => {
    await createSpecialtyService.execute({
      description: "Neurologist",
      user_id: "12345",
    });

    let createdSpecialty = await getSpecialtyService.execute({
      description: "Neurologist",
      userId: "12345",
    });

    expect(createdSpecialty).not.toBeNull();

    await sut.execute({ id: createdSpecialty!.id });

    createdSpecialty = await getSpecialtyService.execute({
      description: "Neurologist",
      userId: "12345",
    });

    expect(createdSpecialty).toBeNull();
  });

  it("should not be able to delete a specialty that was already used by a professional", async () => {
    expect(
      sut.execute({ id: "9c058c7e-3a0b-4847-965c-18a5346cfebb" }),
    ).rejects.toThrowError(ForeignKeyConstraintError);
  });
});
