import { Professional, ProfessionalCreateInput } from "@/types/professional";
import { ProfessionalsRepository } from "../repositories";

export class CreateProfessionalService {
  constructor(private professionalsRepository: ProfessionalsRepository) {}

  async execute(data: ProfessionalCreateInput): Promise<Professional> {
    return await this.professionalsRepository.create(data);
  }
}
