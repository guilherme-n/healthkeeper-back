import { InvalidCredentialsError } from "@/services/errors";
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

  try {
    await req.jwtVerify();
    return res.send(); // jwt is valid, no need to generate a new one
  } catch (err) {}

  try {
    const user = await authenticateService.execute({ email, password });
    const token = await res.jwtSign({
      sub: user.id,
      email: user.email,
      name: user.name,
    });

    return res
      .setCookie("token", token, {
        domain: "localhost",
        path: "/",
        httpOnly: true,
        maxAge: 60 * 60 * 24,
      })
      .send();
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return res.status(401).send({ message: "Email or password invalid" });
    }

    throw err;
  }
}
