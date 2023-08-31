import { PrismaUsersRepository } from "@/repositories/prisma";
import { AuthenticateService } from "../authenticate";

export function makeAuthenticateService() {
  return new AuthenticateService(new PrismaUsersRepository());
}
