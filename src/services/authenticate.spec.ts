import { beforeEach, describe, expect, it, vi } from "vitest";
import { makeAuthenticateService, makeCreateUserService } from "./factories";
import { InvalidCredentialsError } from "./errors";
import { clearMockDatabase } from "@/repositories/utils";

vi.mock("@prisma/client");

describe("Authenticate service", () => {
  const sut = makeAuthenticateService();

  beforeEach(() => {
    clearMockDatabase();
  });

  it("should be able to authenticate", async () => {
    const createUserService = makeCreateUserService();
    const userPassword = "123456";

    const user = {
      name: "John Doe",
      email: "johndoe@email.com",
      password: userPassword,
    };

    const createdUser = await createUserService.execute(user);

    const authenticatedUser = await sut.execute({
      email: createdUser.email,
      password: userPassword,
    });

    expect(authenticatedUser).not.toBeNull();
  });

  it("should not be able to authenticate when email does not exist", async () => {
    expect(
      sut.execute({ email: "invalid-email@email.com", password: "123456" }),
    ).rejects.toThrowError(InvalidCredentialsError);
  });

  it("should not be able to authenticate when password is incorrect", async () => {
    const createUserService = makeCreateUserService();
    const user = {
      name: "John Doe",
      email: "johndoe@email.com",
      password: "123456",
    };

    const createdUser = await createUserService.execute(user);

    expect(
      sut.execute({
        email: createdUser.email,
        password: "123455",
      }),
    ).rejects.toThrowError(InvalidCredentialsError);
  });
});
