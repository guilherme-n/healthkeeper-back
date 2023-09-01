import { PrismaSpecialtiesRepository } from "@/repositories/prisma";
import { SearchSpecialtiesService } from "../";

export function makeSearchSpecialtiesService() {
  return new SearchSpecialtiesService(new PrismaSpecialtiesRepository());
}
