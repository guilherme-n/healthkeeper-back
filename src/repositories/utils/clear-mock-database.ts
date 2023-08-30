import { PrismockClientType } from "prismock/build/main/lib/client";
import { prisma } from "../../lib/prisma";

export function clearMockDatabase() {
  (prisma as PrismockClientType).reset();
}
