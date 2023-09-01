import { Specialty, SpecialtyCreateInput } from "@/types/specialty";
import { User } from "@/types/user";

export interface SpecialtiesRepository {
  create(data: SpecialtyCreateInput): Promise<Specialty>;
  findAll(userId: User["id"]): Promise<Specialty[]>;
}
