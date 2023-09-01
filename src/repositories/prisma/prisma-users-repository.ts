import { User, UserCreateInput } from "@/types/user";
import { UsersRepository } from "../users-repository";
import { prisma } from "@/lib/prisma";

export class PrismaUsersRepository implements UsersRepository {
  async create(data: UserCreateInput): Promise<User> {
    return await prisma.user.create({ data });
  }

  async findByEmail(email: User["email"]): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { email },
    });
  }
}
