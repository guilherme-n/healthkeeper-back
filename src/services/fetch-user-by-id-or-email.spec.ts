import { beforeEach, describe, expect, it, vi } from "vitest";
import { RegisterService, FetchUserByIdOrEmailService } from "./";
import { PrismaUsersRepository } from "../repositories/prisma";
import { SearchParamsNotProvidedError } from "./errors";
import { clearMockDatabase } from "@/repositories/utils";

vi.mock("@prisma/client");

describe("Fetch user by id or email", () => {
  const prismaUsersRepository = new PrismaUsersRepository();
  const sut = new FetchUserByIdOrEmailService(prismaUsersRepository);
  const registerService = new RegisterService(prismaUsersRepository);

  beforeEach(() => {
    clearMockDatabase();
  });

  it("should be able to search by id", async () => {
    const user = {
      name: "John Doe",
      email: "johndoe@email.com",
      password: "password",
    };

    const createdUser = await registerService.execute(user);
    const fetchedUser = await sut.execute({ id: createdUser.id });

    expect(fetchedUser).toMatchObject(createdUser);
  });

  it("should be able to search by email", async () => {
    const user = {
      name: "John Doe",
      email: "johndoe@email.com",
      password: "password",
    };

    const createdUser = await registerService.execute(user);
    const fetchedUser = await sut.execute({ email: createdUser.email });

    expect(fetchedUser).toMatchObject(createdUser);
  });

  it("should throw an error if no params are provided", async () => {
    const user = {
      name: "John Doe",
      email: "johndoe@email.com",
      password: "password",
    };

    await registerService.execute(user);

    await expect(sut.execute({ id: undefined })).rejects.toThrowError(
      SearchParamsNotProvidedError,
    );
  });
});
