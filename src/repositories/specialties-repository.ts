import { Specialty, SpecialtyCreateInput } from "@/types/specialty";

export interface SpecialtiesRepository {
  create(data: SpecialtyCreateInput): Promise<Specialty>;
}
