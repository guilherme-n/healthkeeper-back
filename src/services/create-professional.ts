import { ProfessionalsRepository } from "../repositories";
import { Prisma, Professional } from "@prisma/client";

export class CreateProfessionalService {
  constructor(private professionalsRepository: ProfessionalsRepository) {}

  async execute(
    data: Prisma.ProfessionalUncheckedCreateInput,
  ): Promise<Professional> {
    return await this.professionalsRepository.create(data);
  }
}
