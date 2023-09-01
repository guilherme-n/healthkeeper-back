import { Specialty, SpecialtyCreateInput } from "@/types/specialty";
import { SpecialtiesRepository } from "../specialties-repository";
import { prisma } from "@/lib/prisma";

export class PrismaSpecialtiesRepository implements SpecialtiesRepository {
  create(data: SpecialtyCreateInput): Promise<Specialty> {
    return prisma.specialty.create({ data });
  }
}
