import { SpecialtiesRepository } from "@/repositories";
import { Specialty } from "@/types/specialty";
import { User } from "@/types/user";

interface GetSpecialtyServiceRequest {
  userId: User["id"];
  description: Specialty["description"];
}

export class GetSpecialtyService {
  constructor(private specialtiesRepository: SpecialtiesRepository) {}

  async execute({ userId, description }: GetSpecialtyServiceRequest) {
    return await this.specialtiesRepository.findByDescription({
      userId,
      description,
    });
  }
}
