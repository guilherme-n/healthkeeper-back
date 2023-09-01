import { describe, it, expect, beforeEach, vi } from "vitest";
import { EmailAlreadyRegisteredError } from "./errors";
import { compare } from "bcryptjs";
import { makeCreateUserService } from "./factories";
import { clearMockDatabase } from "@/repositories/utils";

vi.mock("@prisma/client");

describe("register service", () => {
  const sut = makeCreateUserService();

  beforeEach(() => {
    clearMockDatabase();
  });

  it("should be able to register", async () => {
    const user = {
      email: "johndoe@email.com",
      name: "John Doe",
      password: "password",
    };

    const createdUser = await sut.execute(user);

    expect(createdUser.id).toEqual(expect.any(String));
  });

  it("should throw an error if email is already registered", async () => {
    const user1 = {
      email: "johndoe1@email.com",
      name: "John Doe",
      password: "password",
    };

    const user2 = {
      email: "johndoe1@email.com",
      name: "John Doe 2",
      password: "password",
    };
    await sut.execute(user1);

    expect(sut.execute(user2)).rejects.toThrowError(
      EmailAlreadyRegisteredError,
    );
  });

  it("should hash user password upon registration", async () => {
    const user = await sut.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    const isPasswordHashed = await compare("123456", user.password);

    expect(isPasswordHashed).toBeTruthy();
  });
});
