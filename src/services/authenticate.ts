import { UsersRepository } from "@/repositories";
import { User } from "@prisma/client";
import { InvalidCredentialsError } from "./errors";
import { compare } from "bcryptjs";

interface AuthenticateServiceProps {
  email: string;
  password: string;
}

export class AuthenticateService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateServiceProps): Promise<User | null> {
    const user = await this.usersRepository.findByIdOrEmail({ email });

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doPasswordsMatch = await compare(password, user.password);

    if (!doPasswordsMatch) {
      throw new InvalidCredentialsError();
    }

    return user;
  }
}
