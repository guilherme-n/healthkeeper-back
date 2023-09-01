import { Professional as DbProfessional, Prisma } from "@prisma/client";

export type Professional = DbProfessional;

export type ProfessionalCreateInput = Prisma.ProfessionalUncheckedCreateInput;
