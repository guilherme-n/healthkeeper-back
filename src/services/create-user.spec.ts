import { describe, it, expect, beforeEach, beforeAll, vi } from "vitest";
import { CreateUserService } from "./";
import { PrismaUsersRepository } from "../repositories/prisma";
import { Prisma } from "@prisma/client";
import PrismockClient from "prismock";

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
      password: "2j039f092j3f092jf092j029j309fj",
    };

    const createdUser = await sut.execute(user);

    expect(createdUser.id).toEqual(expect.any(String));
  });
});
