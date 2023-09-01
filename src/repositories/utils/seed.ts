import { ProfessionalCreateInput } from "@/types/professional";
import { SpecialtyCreateInput } from "@/types/specialty";
import { UserCreateInput } from "@/types/user";

type Seed = {
  users: UserCreateInput[];
  specialties: SpecialtyCreateInput[];
  professionals: ProfessionalCreateInput[];
};

export const seed: Seed = {
  users: [
    {
      id: "e5a52e72-de26-4798-8416-63565e200808",
      name: "John Doe",
      email: "johndoe@email.com",
      password: "$2a$06$WUMrn/ybFMvs5/xV9C.FoegskxG846T/I5jykcyJKS1yVf87AVK6i",
    },
    {
      id: "29f7978d-0d00-4936-8039-6deac3286128",
      name: "Second user",
      email: "seconduser@email.com",
      password: "$2a$06$WUMrn/ybFMvs5/xV9C.FoegskxG846T/I5jykcyJKS1yVf87AVK6i",
    },
  ],
  specialties: [
    {
      id: "9c058c7e-3a0b-4847-965c-18a5346cfebb",
      description: "Cardiologist",
      user_id: "e5a52e72-de26-4798-8416-63565e200808",
    },
    {
      id: "f10fc9a3-f930-42d7-a27f-a75e196f91ab",
      description: "Dermatologist",
      user_id: "e5a52e72-de26-4798-8416-63565e200808",
    },
    {
      id: "db38e1b6-bf5a-4e9f-bd6e-3ffefc5fe1d2",
      description: "Cardiologist",
      user_id: "29f7978d-0d00-4936-8039-6deac3286128",
    },
  ],
  professionals: [
    {
      id: "659dc3b8-4f2c-4e4a-b30a-bf96f4062e97",
      name: "John doctor",
      user_id: "e5a52e72-de26-4798-8416-63565e200808",
      specialty_id: "9c058c7e-3a0b-4847-965c-18a5346cfebb",
    },
    {
      id: "511c1d4d-3a6b-416e-b41e-bc5b66f8c887",
      name: "Another doctor",
      user_id: "e5a52e72-de26-4798-8416-63565e200808",
      specialty_id: "f10fc9a3-f930-42d7-a27f-a75e196f91ab",
    },
    {
      id: "5d7c74b3-cdb7-4fe9-b0ad-599147179f2c",
      name: "Second user doctor",
      user_id: "29f7978d-0d00-4936-8039-6deac3286128",
      specialty_id: "29f7978d-0d00-4936-8039-6deac3286128",
    },
  ],
};
