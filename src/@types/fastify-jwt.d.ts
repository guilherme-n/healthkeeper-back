import "@fastify/jwt";
import { JwtToken } from "../types/jtw-token";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: JwtToken;
  }
}
