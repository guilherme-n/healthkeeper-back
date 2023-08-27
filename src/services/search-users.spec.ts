import { Prisma } from "@prisma/client";
import { describe, it, beforeEach, vi, expect } from "vitest";
import { SearchUsersService } from "./search-users";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import PrismockClient from "prismock";
import { CreateUserService } from "./create-user";

describe("Search users service", () => {
  let sut: SearchUsersService;
  let createUserService: CreateUserService;

  vi.mock("@prisma/client", async () => {
    const prismock: typeof PrismockClient = await vi.importActual("prismock");

    return {
      ...vi.importActual("@prisma/client"),
      PrismaClient: prismock.PrismockClient,
    };
  });

  beforeEach(() => {
    const prismaUsersRepository = new PrismaUsersRepository();
    sut = new SearchUsersService(prismaUsersRepository);
    createUserService = new CreateUserService(prismaUsersRepository);
  });

  it.only("should be able to get all users", async () => {
    const user1: Prisma.UserCreateInput = {
      name: "John Doe 1",
      email: "johndoe1@email.com",
      password: "jf203f029j3f09js",
    };

    const user2: Prisma.UserCreateInput = {
      name: "John Doe 2",
      email: "johndoe2@email.com",
      password: "jf203f029j3f09js",
    };

    await createUserService.execute(user1);
    await createUserService.execute(user2);

    const { users } = await sut.execute();

    expect(users).toHaveLength(2);
    expect(users).toEqual([
      expect.objectContaining({ name: "John Doe 1" }),
      expect.objectContaining({ name: "John Doe 2" }),
    ]);
  });
});
