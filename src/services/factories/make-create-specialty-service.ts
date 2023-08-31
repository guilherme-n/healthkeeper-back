import { PrismaSpecialtiesRepository } from "@/repositories/prisma";
import { CreateSpecialtyService } from "../create-specialty";

export function makeCreateSpecialtyService() {
  return new CreateSpecialtyService(new PrismaSpecialtiesRepository());
}
