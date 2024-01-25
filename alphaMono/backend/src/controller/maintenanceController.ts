import { FastifyInstance, FastifyRequest } from "fastify";
import { Maintenance, User } from "../models";
import { maintenanceSchema } from "../schema";

export default async function (fastify: FastifyInstance) {
  fastify.get(
    "/maintenance",
    { preHandler: [fastify.authenticate] },
    async (req, res) => {
      try {
        const user = req.user;
        if (user) {
          const maintenances = await Maintenance.findAll({
            include: [
              "Company",
              {
                model: User,
                attributes: { exclude: ["password"] },
              },
            ],
          });
          res.status(200).send({ data: maintenances });
        }
      } catch (error: any) {
        res.status(500).send({ message: error.message });
      }
    }
  );

  fastify.post(
    "/maintenance",
    { preHandler: [fastify.authenticate] },
    async (req, res) => {
      try {
        const data = await maintenanceSchema.add.validate(req.body);
        const user = req.user;

        if (user) {
          const maintenance = await Maintenance.create(data);
          res.status(201).send({ data: maintenance });
        }
      } catch (error: any) {
        res.status(500).send({ message: error.message });
      }
    }
  );

  fastify.put(
    "/maintenance/:id",
    { preHandler: [fastify.authenticate] },
    async (req: FastifyRequest<{ Params: { id: string } }>, res) => {
      try {
        const data = await maintenanceSchema.add.validate(req.body);
        const user = req.user;

        if (user) {
          const maintenance = await Maintenance.update(data, {
            where: { id: req.params.id },
          });
          res.status(201).send({ data: maintenance });
        }
      } catch (error: any) {
        res.status(500).send({ message: error.message });
      }
    }
  );

  fastify.delete(
    "/maintenance/:id",
    { preHandler: [fastify.authenticate] },
    async (req: FastifyRequest<{ Params: { id: string } }>, res) => {
      try {
        const user = req.user;

        if (user) {
          const maintenance = await Maintenance.destroy({
            where: { id: req.params.id },
          });
          res.status(201).send({ data: maintenance });
        }
      } catch (error: any) {
        res.status(500).send({ message: error.message });
      }
    }
  );
}
