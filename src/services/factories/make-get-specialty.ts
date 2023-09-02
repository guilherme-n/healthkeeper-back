import { PrismaSpecialtiesRepository } from "@/repositories/prisma";
import { GetSpecialtyService } from "../get-specialty";

export function makeGetSpecialtyService() {
  return new GetSpecialtyService(new PrismaSpecialtiesRepository());
}
