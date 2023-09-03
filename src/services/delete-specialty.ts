import { SpecialtiesRepository } from "@/repositories";
import { Specialty } from "@prisma/client";
import { makeSearchProfessionalsService } from "./factories";
import { ForeignKeyConstraintError } from "./errors";

export class DeleteSpecialtyService {
  constructor(private specialtiesRepository: SpecialtiesRepository) {}

  async execute({ id }: Pick<Specialty, "id">) {
    const searchProfessionalsService = makeSearchProfessionalsService();
    const professionals = await searchProfessionalsService.execute({
      specialtyId: id,
    });

    if (professionals.length > 0) {
      throw new ForeignKeyConstraintError();
    }

    await this.specialtiesRepository.delete({ id });
  }
}
