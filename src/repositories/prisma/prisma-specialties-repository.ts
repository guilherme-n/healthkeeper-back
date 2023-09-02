import { Specialty, SpecialtyCreateInput } from "@/types/specialty";
import { SpecialtiesRepository } from "../specialties-repository";
import { prisma } from "@/lib/prisma";
import { User } from "@/types/user";

export class PrismaSpecialtiesRepository implements SpecialtiesRepository {
  create(data: SpecialtyCreateInput): Promise<Specialty> {
    return prisma.specialty.create({ data });
  }

  async findByDescription({
    userId,
    description,
  }: {
    userId: User["id"];
    description: Specialty["description"];
  }): Promise<Specialty | null> {
    return await prisma.specialty.findFirst({
      where: { user_id: userId, description },
      orderBy: { description: "asc" },
    });
  }

  async findAll({ userId }: { userId: User["id"] }): Promise<Specialty[]> {
    return prisma.specialty.findMany({
      where: { user_id: userId },
      orderBy: { description: "asc" },
    });
  }
}
