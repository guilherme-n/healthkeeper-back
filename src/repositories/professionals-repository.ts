import { Professional, ProfessionalCreateInput } from "@/types/professional";

export interface ProfessionalsRepository {
  create(data: ProfessionalCreateInput): Promise<Professional>;

  search(
    data: Pick<Professional, "user_id" | "specialty_id">,
  ): Promise<Professional[]>;
}
