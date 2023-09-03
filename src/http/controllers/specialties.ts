import { SpecialtyAlreadyRegisteredError } from "@/services/errors";
import {
  makeCreateSpecialtyService,
  makeSearchSpecialtiesService,
} from "@/services/factories";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { verifyJWT } from "../middlewares/verify-jwt";
import { JwtToken } from "@/types/jtw-token";

export async function specialtiesRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.get("/", async (req: FastifyRequest, res: FastifyReply) => {
    const token = (await req.jwtDecode()) as JwtToken;

    const searchSpecialtyService = makeSearchSpecialtiesService();
    const specialties = await searchSpecialtyService.execute({
      userId: token.sub,
    });

    return res.send(
      specialties.map((specialty) => ({
        id: specialty.id,
        description: specialty.description,
      })),
    );
  });

  app.post("/", async (req: FastifyRequest, res: FastifyReply) => {
    const token = (await req.jwtDecode()) as JwtToken;
    const requestBodySchema = z.object({
      description: z.string(),
    });

    const specialty = requestBodySchema.parse(req.body);

    const createSpecialtyService = makeCreateSpecialtyService();

    let createdSpecialty;
    try {
      createdSpecialty = await createSpecialtyService.execute({
        ...specialty,
        user_id: token.sub,
      });
    } catch (err) {
      if (err instanceof SpecialtyAlreadyRegisteredError) {
        return res.status(409).send({ message: err.message });
      } else {
        throw err;
      }
    }

    return res.status(201).send({
      id: createdSpecialty.id,
      description: createdSpecialty.description,
    });
  });
}
