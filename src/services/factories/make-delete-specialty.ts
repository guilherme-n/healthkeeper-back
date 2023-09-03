import { PrismaSpecialtiesRepository } from "@/repositories/prisma";
import { DeleteSpecialtyService } from "../delete-specialty";

export function makeDeleteSpecialtyService() {
  return new DeleteSpecialtyService(new PrismaSpecialtiesRepository());
}
