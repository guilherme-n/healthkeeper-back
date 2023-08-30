import { PrismaUsersRepository } from "@/repositories/prisma";
import { CreateUserService } from "../create-user";

export function makeCreateUserService() {
  return new CreateUserService(new PrismaUsersRepository());
}
