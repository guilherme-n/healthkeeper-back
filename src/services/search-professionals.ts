import { ProfessionalsRepository } from "@/repositories";
import { ProfessionalCreateInput } from "@/types/professional";

interface SearchProfessionalsServiceRequest {
  specialtyId?: ProfessionalCreateInput["specialty_id"];
  userId?: ProfessionalCreateInput["user_id"];
}

export class SearchProfessionalsService {
  constructor(private ProfessionalsRepository: ProfessionalsRepository) {}

  async execute({ specialtyId, userId }: SearchProfessionalsServiceRequest) {
    return await this.ProfessionalsRepository.findAll({
      specialty_id: specialtyId,
      user_id: userId,
    });
  }
}
