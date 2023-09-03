import { FastifyInstance } from "fastify";
import {
  authenticate,
  register,
  signOut,
  specialtiesRoutes,
} from "./controllers";

export async function appRoutes(app: FastifyInstance) {
  app.post("/register", register);
  app.post("/authenticate", authenticate);
  app.post("/sign-out", signOut);

  app.register(specialtiesRoutes, { prefix: "specialties" });
}
