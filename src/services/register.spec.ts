import { describe, it, expect, beforeEach, vi } from "vitest";
import { EmailAlreadyRegisteredError } from "./errors";
import { compare } from "bcryptjs";
import { makeRegisterService } from "./factories";
import { clearMockDatabase } from "@/repositories/utils";

vi.mock("@prisma/client");

describe("register service", () => {
  const sut = makeRegisterService();

  beforeEach(() => clearMockDatabase());

  it("should be able to register", async () => {
    const user = {
      name: "John Doe",
      email: "johndoe-new@email.com",
      password: "password",
    };

    const createdUser = await sut.execute(user);

    expect(createdUser.id).toEqual(expect.any(String));
  });

  it("should throw an error if email is already registered", async () => {
    const user1 = {
      name: "John Doe",
      email: "johndoe@email.com",
      password: "password",
    };

    expect(sut.execute(user1)).rejects.toThrowError(
      EmailAlreadyRegisteredError,
    );
  });

  it("should hash user password upon registration", async () => {
    const user = await sut.execute({
      name: "John Doe",
      email: "johndoe-new@email.com",
      password: "123456",
    });

    const isPasswordHashed = await compare("123456", user.password);

    expect(isPasswordHashed).toBeTruthy();
  });
});
