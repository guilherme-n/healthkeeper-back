import { PrismaProfessionalsRepository } from "@/repositories/prisma";
import { SearchProfessionalsService } from "..";

export function makeSearchProfessionalsService() {
  return new SearchProfessionalsService(new PrismaProfessionalsRepository());
}
