import { FastifyInstance } from "fastify";
import authController from "./authController";
import clientController from "./clientController";
import companyController from "./companyController";
import maintenanceController from "./maintenanceController";
import userController from "./userController";

export default function (fastify: FastifyInstance) {
  authController(fastify);
  clientController(fastify);
  companyController(fastify);
  maintenanceController(fastify);
  userController(fastify);
}
