import { beforeEach, describe, expect, it, vi } from "vitest";
import { clearMockDatabase } from "@/repositories/utils";
import { makeGetSpecialtyService } from "./factories";

vi.mock("@prisma/client");

describe("Get specialty", () => {
  const sut = makeGetSpecialtyService();

  beforeEach(() => clearMockDatabase());

  it("should be able to get a specialty", async () => {
    const createdSpecialty = await sut.execute({
      description: "Dermatologist",
      userId: "e5a52e72-de26-4798-8416-63565e200808",
    });

    expect(createdSpecialty).not.toBeNull();

    expect(createdSpecialty).toEqual(
      expect.objectContaining({ id: "f10fc9a3-f930-42d7-a27f-a75e196f91ab" }),
    );
  });

  it("should return null if no specialty is found", async () => {
    const createdSpecialty = await sut.execute({
      description: "Dentist",
      userId: "e5a52e72-de26-4798-8416-63565e200808",
    });

    expect(createdSpecialty).toBeNull();
  });
});
