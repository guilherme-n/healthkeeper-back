import { PrismockClient } from "prismock";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { CreateUserService, FetchUserByIdOrEmailService } from "./";
import { PrismaUsersRepository } from "../repositories/prisma";
import { SearchParamsNotProvidedError } from "./errors";
import { clearMockDatabase } from "@/repositories/utils";

describe("Fetch user by id or email", () => {
  let sut: FetchUserByIdOrEmailService;
  let createUserService: CreateUserService;

  vi.mock("@prisma/client", () => ({
    PrismaClient: PrismockClient,
  }));

  beforeAll(() => {
    const prismaUsersRepository = new PrismaUsersRepository();
    sut = new FetchUserByIdOrEmailService(prismaUsersRepository);
    createUserService = new CreateUserService(prismaUsersRepository);
  });

  beforeEach(() => {
    clearMockDatabase();
  });

  it("should be able to search by id", async () => {
    const user = {
      name: "John Doe",
      email: "johndoe@email.com",
      password: "password",
    };

    const createdUser = await createUserService.execute(user);
    const fetchedUser = await sut.execute({ id: createdUser.id });

    expect(fetchedUser).toMatchObject(createdUser);
  });

  it("should be able to search by email", async () => {
    const user = {
      name: "John Doe",
      email: "johndoe@email.com",
      password: "password",
    };

    const createdUser = await createUserService.execute(user);
    const fetchedUser = await sut.execute({ email: createdUser.email });

    expect(fetchedUser).toMatchObject(createdUser);
  });

  it("should throw an error if no params are provided", async () => {
    const user = {
      name: "John Doe",
      email: "johndoe@email.com",
      password: "password",
    };

    await createUserService.execute(user);

    await expect(sut.execute({ id: undefined })).rejects.toThrowError(
      SearchParamsNotProvidedError,
    );
  });
});
