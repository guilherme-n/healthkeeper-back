import { describe, it, expect, beforeEach, beforeAll, vi } from "vitest";
import { CreateUserService } from "./";
import { PrismaUsersRepository } from "../repositories/prisma";
import { Prisma } from "@prisma/client";
import PrismockClient from "prismock";
import { EmailAlreadyRegisteredError } from "./errors";
import { compare } from "bcryptjs";

describe("create user service", () => {
  let sut: CreateUserService;

  vi.mock("@prisma/client", async () => {
    const prismock: typeof PrismockClient = await vi.importActual("prismock");

    return {
      ...vi.importActual("@prisma/client"),
      PrismaClient: prismock.PrismockClient,
    };
  });

  beforeEach(() => {
    sut = new CreateUserService(new PrismaUsersRepository());
  });

  it("should create user", async () => {
    const user: Prisma.UserCreateInput = {
      email: "johndoe@email.com",
      name: "John Doe",
      password: "password",
    };

    const createdUser = await sut.execute(user);

    expect(createdUser.id).toEqual(expect.any(String));
  });

  it("should throw an error if email is already registered", async () => {
    const user1: Prisma.UserCreateInput = {
      email: "johndoe1@email.com",
      name: "John Doe",
      password: "password",
    };

    const user2: Prisma.UserCreateInput = {
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
