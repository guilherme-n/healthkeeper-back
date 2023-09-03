import { Professional, ProfessionalCreateInput } from "@/types/professional";
import { Optional } from "@prisma/client/runtime/library";

export interface ProfessionalsRepository {
  create(data: ProfessionalCreateInput): Promise<Professional>;

  findAll(
    data: Partial<Pick<Professional, "user_id" | "specialty_id">>,
  ): Promise<Professional[]>;
}
