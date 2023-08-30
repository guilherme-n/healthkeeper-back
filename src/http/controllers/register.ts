import { EmailAlreadyRegisteredError } from "@/services/errors";
import { makeCreateUserService } from "@/services/factories";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function register(req: FastifyRequest, res: FastifyReply) {
  const requestBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = requestBodySchema.parse(req.body);

  const createUserService = makeCreateUserService();

  try {
    await createUserService.execute({
      name,
      email,
      password,
    });
  } catch (err) {
    if (err instanceof EmailAlreadyRegisteredError) {
      return res.status(409).send({ message: err.message });
    }

    throw err;
  }

  return res.status(201).send();
}
