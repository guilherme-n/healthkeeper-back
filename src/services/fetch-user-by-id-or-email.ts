import { UsersRepository } from "../repositories";
import { Prisma } from "@prisma/client";
import { SearchParamsNotProvidedError } from "./errors";

export class FetchUserByIdOrEmailService {
  constructor(private usersRepository: UsersRepository) {}

  async execute(data: Prisma.UserWhereUniqueInput) {
    if (!data.id && !data.email) {
      throw new SearchParamsNotProvidedError();
    }

    return this.usersRepository.findByIdOrEmail(data);
  }
}
