import { Specialty, SpecialtyCreateInput } from "@/types/specialty";
import { SpecialtiesRepository } from "../repositories";

export class CreateSpecialtyService {
  constructor(private specialtiesRepository: SpecialtiesRepository) {}
  async execute(data: SpecialtyCreateInput): Promise<Specialty> {
    return await this.specialtiesRepository.create(data);
  }
}
