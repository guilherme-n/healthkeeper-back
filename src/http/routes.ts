import { FastifyInstance } from "fastify";
import { register, specialtiesRoutes } from "./controllers";

export async function appRoutes(app: FastifyInstance) {
  app.register(specialtiesRoutes, { prefix: "specialties" });
  app.post("/users", register);
}
