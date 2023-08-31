import { makeAuthenticateService } from "@/services/factories";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticate(req: FastifyRequest, res: FastifyReply) {
  const bodyRequestSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = bodyRequestSchema.parse(req.body);

  const authenticateService = makeAuthenticateService();
  await authenticateService.execute({ email, password });

  return res.send();
}
