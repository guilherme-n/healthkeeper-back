import { describe, it, beforeEach, vi, expect } from "vitest";
import { CreateUserService, SearchUsersService } from "./";
import { PrismaUsersRepository } from "../repositories/prisma";
import { clearMockDatabase } from "@/repositories/utils";

vi.mock("@prisma/client");

describe("Search users service", () => {
  const prismaUsersRepository = new PrismaUsersRepository();
  const sut = new SearchUsersService(prismaUsersRepository);
  const createUserService = new CreateUserService(prismaUsersRepository);

  beforeEach(() => {
    clearMockDatabase();
  });

  it("should be able to get all users", async () => {
    const user1 = {
      name: "John Doe 1",
      email: "johndoe1@email.com",
      password: "password",
    };

    const user2 = {
      name: "John Doe 2",
      email: "johndoe2@email.com",
      password: "password",
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
