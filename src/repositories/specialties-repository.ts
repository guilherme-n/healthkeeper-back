import { Prisma, Specialty } from "@prisma/client";

export interface SpecialtiesRepository {
  create(data: Prisma.SpecialtyCreateInput): Promise<Specialty>;
}
