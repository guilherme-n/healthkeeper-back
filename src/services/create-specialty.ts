import { Specialty, SpecialtyCreateInput } from "@/types/specialty";
import { SpecialtiesRepository } from "../repositories";
import { makeGetSpecialtyService } from "./factories";
import { SpecialtyAlreadyRegisteredError } from "./errors";

export class CreateSpecialtyService {
  constructor(private specialtiesRepository: SpecialtiesRepository) {}
  async execute(data: SpecialtyCreateInput): Promise<Specialty> {
    const getSpecialtyService = makeGetSpecialtyService();

    const specialty = await getSpecialtyService.execute({
      userId: data.user_id,
      description: data.description,
    });

    if (specialty) throw new SpecialtyAlreadyRegisteredError();

    return await this.specialtiesRepository.create(data);
  }
}
