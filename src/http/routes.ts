import { FastifyInstance } from "fastify";
import { authenticate, register, specialtiesRoutes } from "./controllers";

export async function appRoutes(app: FastifyInstance) {
  app.post("/register", register);
  app.post("/authenticate", authenticate);

  app.register(specialtiesRoutes, { prefix: "specialties" });
}
