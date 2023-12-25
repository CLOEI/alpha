import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import { verify } from "jsonwebtoken";

import settings from "../settings.json";

import {
  authController,
  clientController,
  companyController,
} from "./controller";

import "dotenv/config";

const fastify = Fastify({
  logger: process.env.NODE_ENV === "development",
});

fastify.decorateRequest("user", null);
fastify.decorate(
  "authenticate",
  (req: FastifyRequest, _: FastifyReply): void => {
    try {
      const token = req.headers.authorization;

      if (token) {
        const data = verify(token, process.env.JWT_SECRET!);
        req.user = data as User;
      } else {
        throw new Error("Token not found");
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);

authController(fastify);
clientController(fastify);
companyController(fastify);

const start = async () => {
  try {
    await fastify.listen({
      port: settings.port,
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
