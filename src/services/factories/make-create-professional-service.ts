import { PrismaProfessionalsRepository } from "@/repositories/prisma";
import { CreateProfessionalService } from "../create-professional";

export function makeCreateProfessionalService() {
  return new CreateProfessionalService(new PrismaProfessionalsRepository());
}
