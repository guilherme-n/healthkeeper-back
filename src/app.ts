import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import fastifyCors from "@fastify/cors";

import { appRoutes } from "./http/routes";
import { ZodError } from "zod";
import { env } from "./env";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: { cookieName: "token", signed: false },
});

app.register(fastifyCookie);

app.register(fastifyCors, {
  origin: "*",
});

app.register(appRoutes);

app.setErrorHandler((err, _, res) => {
  if (err instanceof ZodError) {
    return res
      .status(400)
      .send({ message: "Validation error", issues: err.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.error(err);
  } else {
    // TODO: there should be a log to an external tool like DataDog
  }

  return res.status(500).send({ message: "Internal server error" });
});
