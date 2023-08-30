import { UsersRepository } from "../repositories";
import { Prisma, User } from "@prisma/client";

export class CreateUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute(user: Prisma.UserCreateInput): Promise<User> {
    return await this.usersRepository.create(user);
  }
}
