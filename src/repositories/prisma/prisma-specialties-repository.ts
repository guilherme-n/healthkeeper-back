import { Prisma, Specialty } from "@prisma/client";
import { SpecialtiesRepository } from "../specialties-repository";
import { prisma } from "@/lib/prisma";

export class PrismaSpecialtiesRepository implements SpecialtiesRepository {
  create(data: Prisma.SpecialtyUncheckedCreateInput): Promise<Specialty> {
    return prisma.specialty.create({ data });
  }
}
