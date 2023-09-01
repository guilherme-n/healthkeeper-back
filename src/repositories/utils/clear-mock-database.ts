import { PrismockClientType } from "prismock/build/main/lib/client";
import { prisma } from "../../lib/prisma";
import { seed } from "./seed";

export async function clearMockDatabase() {
  (prisma as PrismockClientType).reset();

  await prisma.user.createMany({ data: seed.users });
  await prisma.specialty.createMany({ data: seed.specialties });
  await prisma.professional.createMany({ data: seed.professionals });
}
