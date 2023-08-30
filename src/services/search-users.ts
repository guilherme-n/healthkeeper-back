import { UsersRepository } from "../repositories";
import { User } from "@prisma/client";

interface SearchUsersServiceResponse {
  users: User[];
}

export class SearchUsersService {
  constructor(private usersRepository: UsersRepository) {}

  async execute(): Promise<SearchUsersServiceResponse> {
    const users = await this.usersRepository.findAll();
    return { users };
  }
}
