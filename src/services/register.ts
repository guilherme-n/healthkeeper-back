import { User, UserCreateInput } from "@/types/user";
import { UsersRepository } from "../repositories";
import { EmailAlreadyRegisteredError } from "./errors";
import { hash } from "bcryptjs";

export class RegisterService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: UserCreateInput): Promise<User> {
    const isEmailAlreadyRegistered =
      await this.usersRepository.findByEmail(email);

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
