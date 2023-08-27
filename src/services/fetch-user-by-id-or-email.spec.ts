import { beforeEach, describe, expect, it, vi } from "vitest";
import { FetchUserByIdOrEmailService } from "./fetch-user-by-id-or-email";
import { CreateUserService } from "./create-user";
import PrismockClient from "prismock";
import { Prisma } from "@prisma/client";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { SearchParamsNotProvidedError } from "./errors/search-params-not-provided-error";

describe("Fetch user by id or email", () => {
  let sut: FetchUserByIdOrEmailService;
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
    sut = new FetchUserByIdOrEmailService(prismaUsersRepository);
    createUserService = new CreateUserService(prismaUsersRepository);
  });

  it("should be able to search by id", async () => {
    const user: Prisma.UserCreateInput = {
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "password",
    };

    const createdUser = await createUserService.execute(user);
    const fetchedUser = await sut.execute({ id: createdUser.id });

    expect(fetchedUser).toMatchObject(createdUser);
  });

  it("should be able to search by email", async () => {
    const user: Prisma.UserCreateInput = {
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "password",
    };

    const createdUser = await createUserService.execute(user);
    const fetchedUser = await sut.execute({ email: createdUser.email });

    expect(fetchedUser).toMatchObject(createdUser);
  });

  it("should throw an error if no params are provided", async () => {
    const user: Prisma.UserCreateInput = {
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "password",
    };

    await createUserService.execute(user);

    await expect(sut.execute({ id: undefined })).rejects.toThrowError(
      SearchParamsNotProvidedError,
    );
  });
});
