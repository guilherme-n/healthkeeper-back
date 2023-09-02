import { SpecialtyAlreadyRegisteredError } from "@/services/errors";
import {
  makeCreateSpecialtyService,
  makeSearchSpecialtiesService,
} from "@/services/factories";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function specialtiesRoutes(app: FastifyInstance) {
  app.get("/", async (req: FastifyRequest, res: FastifyReply) => {
    const searchSpecialtyService = makeSearchSpecialtiesService();
    const specialties = await searchSpecialtyService.execute({
      userId: "66c2fa58-51c5-41f5-b971-de7bd0c1c782",
    });

    return res.send(
      specialties.map((specialty) => ({
        id: specialty.id,
        description: specialty.description,
      })),
    );
  });

  app.post("/", async (req: FastifyRequest, res: FastifyReply) => {
    const requestBodySchema = z.object({
      description: z.string(),
    });

    const specialty = requestBodySchema.parse(req.body);

    const createSpecialtyService = makeCreateSpecialtyService();

    let createdSpecialty;
    try {
      createdSpecialty = await createSpecialtyService.execute({
        ...specialty,
        user_id: "66c2fa58-51c5-41f5-b971-de7bd0c1c782",
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
