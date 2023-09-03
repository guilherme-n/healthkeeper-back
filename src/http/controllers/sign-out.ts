import { FastifyReply, FastifyRequest } from "fastify";

export async function signOut(req: FastifyRequest, res: FastifyReply) {
  return res.clearCookie("token").send();
}
