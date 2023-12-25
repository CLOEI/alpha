import { FastifyInstance, FastifyRequest } from "fastify";
import { companySchema } from "../schema";
import { verify } from "jsonwebtoken";
import { Company } from "../models";

import settings from "../../settings.json";

export default async function (fastify: FastifyInstance) {
  fastify.get(
    "/company",
    { preHandler: [fastify.authenticate] },
    async (req, res) => {
      try {
        const token = req.headers.authorization;

        if (token) {
          const _ = verify(token, process.env.JWT_SECRET!) as User;
          const companies = await Company.findAll();
          res.status(200).send({ data: companies });
        } else {
          res.status(401).send({ message: "No token provided" });
        }
      } catch (error: any) {
        res.status(500).send({ message: error.message });
      }
    }
  );

  fastify.post(
    "/company",
    { preHandler: [fastify.authenticate] },
    async (req, res) => {
      try {
        const data = await companySchema.add.validate(req.body);
        const user = req.user;

        if (user) {
          if (settings.permission.companyUpdate.includes(user.role)) {
            const company = await Company.create(data);
            res.status(201).send({ data: company });
          }
        }
      } catch (error: any) {
        res.status(500).send({ message: error.message });
      }
    }
  );

  fastify.put(
    "/company/:id",
    { preHandler: [fastify.authenticate] },
    async (req: FastifyRequest<{ Params: { id: string } }>, res) => {
      try {
        const data = await companySchema.add.validate(req.body);
        const user = req.user;

        if (user) {
          if (settings.permission.companyUpdate.includes(user.role)) {
            const company = await Company.update(data, {
              where: { id: req.params.id },
            });
            res.status(201).send({ data: company });
          }
        }
      } catch (error: any) {
        res.status(500).send({ message: error.message });
      }
    }
  );

  fastify.delete(
    "/company/:id",
    { preHandler: [fastify.authenticate] },
    async (req: FastifyRequest<{ Params: { id: string } }>, res) => {
      try {
        const user = req.user;

        if (user) {
          if (settings.permission.companyUpdate.includes(user.role)) {
            const company = await Company.destroy({
              where: { id: req.params.id },
            });
            res.status(201).send({ data: company });
          }
        }
      } catch (error: any) {
        res.status(500).send({ message: error.message });
      }
    }
  );
}
