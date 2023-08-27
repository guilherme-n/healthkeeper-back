import { UsersRepository } from "@/repositories/users-repository";
import { Prisma, User } from "@prisma/client";

export class CreateUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute(user: Prisma.UserCreateInput): Promise<User> {
    return await this.usersRepository.create(user);
  }
}
