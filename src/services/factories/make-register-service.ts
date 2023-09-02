import { PrismaUsersRepository } from "@/repositories/prisma";
import { RegisterService } from "../register";

export function makeRegisterService() {
  return new RegisterService(new PrismaUsersRepository());
}
