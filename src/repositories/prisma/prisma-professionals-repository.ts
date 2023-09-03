import { Professional, ProfessionalCreateInput } from "@/types/professional";
import { ProfessionalsRepository } from "../professionals-repository";
import { prisma } from "@/lib/prisma";

export class PrismaProfessionalsRepository implements ProfessionalsRepository {
  async create(data: ProfessionalCreateInput): Promise<Professional> {
    return await prisma.professional.create({ data });
  }
  async findAll({
    specialty_id,
    user_id,
  }: Pick<Professional, "user_id" | "specialty_id">): Promise<Professional[]> {
    return await prisma.professional.findMany({
      where: { user_id, specialty_id },
    });
  }
}
