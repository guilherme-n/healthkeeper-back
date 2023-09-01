import { User as DbUser, Prisma } from "@prisma/client";

export type User = DbUser;

export type UserCreateInput = Prisma.UserUncheckedCreateInput;
