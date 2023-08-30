import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { prisma } from "@/lib/prisma";

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput): Promise<User> {
    return await prisma.user.create({ data });
  }

  async findAll(): Promise<User[]> {
    return await prisma.user.findMany();
  }

  async findByIdOrEmail(
    data: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { email: data.email },
    });
  }
}
