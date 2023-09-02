import { SpecialtiesRepository } from "@/repositories";
import { User } from "@/types/user";

interface SearchSpecialtiesServiceRequest {
  userId: User["id"];
}

export class SearchSpecialtiesService {
  constructor(private specialtiesRepository: SpecialtiesRepository) {}

  async execute({ userId }: SearchSpecialtiesServiceRequest) {
    return await this.specialtiesRepository.findAll({ userId });
  }
}
