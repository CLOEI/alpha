import { FastifyInstance, FastifyRequest } from "fastify";
import { clientSchema } from "../schema";
import { Client } from "../models";

import settings from "../../settings.json";

export default async function (fastify: FastifyInstance) {
  fastify.get("/client", { preHandler: [fastify.authenticate] }, async () => {
    try {
      const clients = await Client.findAll();
      return { data: clients };
    } catch (error: any) {
      return { message: error.message };
    }
  });

  fastify.post(
    "/client",
    { preHandler: [fastify.authenticate] },
    async (req, res) => {
      try {
        const data = await clientSchema.add.validate(req.body);
        const user = req.user;
        if (user) {
          if (settings.permission.clientUpdate.includes(user.role)) {
            const client = await Client.create(data);
            res.status(201).send({ data: client });
          }
        }
      } catch (error: any) {
        res.status(401).send({ message: error.message });
      }
    }
  );

  fastify.put(
    "/client/:id",
    { preHandler: [fastify.authenticate] },
    async (req: FastifyRequest<{ Params: { id: string } }>, res) => {
      try {
        const data = await clientSchema.add.validate(req.body); // add can be used for update
        const user = req.user;
        if (user) {
          if (user.role === "owner" || user.role === "admin") {
            const client = await Client.update(data, {
              where: { id: req.params.id },
            });
            res.status(201).send({ data: client });
          }
        }
      } catch (error: any) {
        res.status(401).send({ message: error.message });
      }
    }
  );

  fastify.delete(
    "/client/:id",
    { preHandler: [fastify.authenticate] },
    async (req: FastifyRequest<{ Params: { id: string } }>, res) => {
      try {
        const user = req.user;
        if (user) {
          if (settings.permission.clientUpdate.includes(user.role)) {
            const client = await Client.destroy({
              where: { id: req.params.id },
            });
            res.status(201).send({ data: client });
          }
        }
      } catch (error: any) {
        res.status(401).send({ message: error.message });
      }
    }
  );
}
