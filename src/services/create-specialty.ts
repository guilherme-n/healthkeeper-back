import { SpecialtiesRepository } from "../repositories";
import { Prisma, Specialty } from "@prisma/client";

export class CreateSpecialtyService {
  constructor(private specialtiesRepository: SpecialtiesRepository) {}
  async execute(
    data: Prisma.SpecialtyUncheckedCreateInput,
  ): Promise<Specialty> {
    return await this.specialtiesRepository.create(data);
  }
}
