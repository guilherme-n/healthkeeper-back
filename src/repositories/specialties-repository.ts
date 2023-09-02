import { Specialty, SpecialtyCreateInput } from "@/types/specialty";
import { User } from "@/types/user";

export interface SpecialtiesRepository {
  create(data: SpecialtyCreateInput): Promise<Specialty>;
  findByDescription(data: {
    userId: User["id"];
    description: Specialty["description"];
  }): Promise<Specialty | null>;
  findAll(data: { userId: User["id"] }): Promise<Specialty[]>;
}
