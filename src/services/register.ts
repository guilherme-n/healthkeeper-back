import { UsersRepository } from "../repositories";
import { Prisma, User } from "@prisma/client";
import { EmailAlreadyRegisteredError } from "./errors";
import { hash } from "bcryptjs";

export class RegisterService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: Prisma.UserCreateInput): Promise<User> {
    const isEmailAlreadyRegistered = await this.usersRepository.findByIdOrEmail(
      {
        email,
      },
    );

    if (isEmailAlreadyRegistered) {
      throw new EmailAlreadyRegisteredError();
    }

    const hashedPassword = await hash(password, 6);

    return await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });
  }
}
