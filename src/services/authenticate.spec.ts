import { beforeEach, describe, expect, it, vi } from "vitest";
import { makeAuthenticateService } from "./factories";
import { InvalidCredentialsError } from "./errors";
import { clearMockDatabase } from "@/repositories/utils";

vi.mock("@prisma/client");

describe("Authenticate service", () => {
  const sut = makeAuthenticateService();

  beforeEach(() => clearMockDatabase());

  it.only("should be able to authenticate", async () => {
    const authenticatedUser = await sut.execute({
      email: "johndoe@email.com",
      password: "123456",
    });

    expect(authenticatedUser).not.toBeNull();
  });

  it("should not be able to authenticate when email does not exist", async () => {
    expect(
      sut.execute({ email: "invalid-email@email.com", password: "123456" }),
    ).rejects.toThrowError(InvalidCredentialsError);
  });

  it("should not be able to authenticate when password is incorrect", async () => {
    expect(
      sut.execute({
        email: "johndoe@email.com",
        password: "123455",
      }),
    ).rejects.toThrowError(InvalidCredentialsError);
  });
});
