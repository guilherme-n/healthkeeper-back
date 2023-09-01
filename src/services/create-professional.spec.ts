import { describe, it, vi, expect } from "vitest";
import { makeCreateProfessionalService } from "./factories";

vi.mock("@prisma/client");

describe("Create professional service", () => {
  const sut = makeCreateProfessionalService();

  it("should be able to create a professional", async () => {
    const professional = {
      name: "John doctor 2",
      specialty_id: "1e483734-8615-4813-9240-78330ee6d12a",
      user_id: "86d2b271-0f12-46d7-aaba-296d26ccd8ae",
    };

    const createdProfessional = await sut.execute(professional);

    expect(createdProfessional.id).toEqual(expect.any(String));
  });
});
