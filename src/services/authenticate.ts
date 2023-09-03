import { UsersRepository } from "@/repositories";
import { InvalidCredentialsError } from "./errors";
import { compare } from "bcryptjs";
import { User } from "@/types/user";

interface AuthenticateServiceRequest {
  email: string;
  password: string;
}

export class AuthenticateService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateServiceRequest): Promise<User> {
    const user = await this.usersRepository.findByEmail(email);

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
