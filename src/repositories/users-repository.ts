import { User, UserCreateInput } from "@/types/user";

export interface UsersRepository {
  create(data: UserCreateInput): Promise<User>;

  findByEmail(email: User["email"]): Promise<User | null>;
}
