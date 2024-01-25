import { FastifyInstance, FastifyRequest } from "fastify";
import { Maintenance, User } from "../models";

export default async function (fastify: FastifyInstance) {
  fastify.get(
    "/users",
    { preHandler: [fastify.authenticate] },
    async (req, res) => {
      try {
        const users = await User.findAll({
          include: [{ model: Maintenance, include: ["Company"] }],
        });
        res.status(200).send({ data: users });
      } catch (error: any) {
        res.status(500).send({ message: error.message });
      }
    }
  );

  fastify.delete(
    "/users/:id",
    { preHandler: [fastify.authenticate] },
    async (req: FastifyRequest<{ Params: { id: string } }>, res) => {
      try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
          return res.status(404).send({ message: "User not found" });
        }
        await user.destroy();
        res.status(200).send({ message: "User deleted" });
      } catch (error: any) {
        res.status(500).send({ message: error.message });
      }
    }
  );
}
