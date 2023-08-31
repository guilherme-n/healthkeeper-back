import { makeCreateSpecialtyService } from "@/services/factories";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function specialtiesRoutes(app: FastifyInstance) {
  app.get("/", (req: FastifyRequest, res: FastifyReply) => {});

  app.post("/", async (req: FastifyRequest, res: FastifyReply) => {
    const requestBodySchema = z.object({
      description: z.string(),
    });

    const specialty = requestBodySchema.parse(req.body);

    const createSpecialtyService = makeCreateSpecialtyService();
    const createdSpecialty = await createSpecialtyService.execute({
      ...specialty,
      user_id: "66c2fa58-51c5-41f5-b971-de7bd0c1c782",
    });

    return res.status(201).send({ specialty: createdSpecialty });
  });
}
