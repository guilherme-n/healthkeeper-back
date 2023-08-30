import { Prisma, Professional } from "@prisma/client";

export interface ProfessionalsRepository {
  create(data: Prisma.ProfessionalCreateInput): Promise<Professional>;

  search(
    data: Pick<Professional, "user_id" | "specialty_id">,
  ): Promise<Professional[]>;
}
