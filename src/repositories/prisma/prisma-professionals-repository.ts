import { Prisma, Professional } from "@prisma/client";
import { ProfessionalsRepository } from "../professionals-repository";
import { prisma } from "@/lib/prisma";

export class PrismaProfessionalsRepository implements ProfessionalsRepository {
  async create(data: Prisma.ProfessionalCreateInput): Promise<Professional> {
    return await prisma.professional.create({ data });
  }
  async search(
    data: Pick<Professional, "user_id" | "specialty_id">,
  ): Promise<Professional[]> {
    return await prisma.professional.findMany({
      where: { user_id: data.user_id },
    });
  }
}
