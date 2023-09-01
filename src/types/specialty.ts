import { Specialty as DbSpecialty, Prisma } from "@prisma/client";

export type Specialty = DbSpecialty;

export type SpecialtyCreateInput = Prisma.SpecialtyUncheckedCreateInput;
