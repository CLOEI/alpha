import fastify, { FastifyRequest } from "fastify";

declare module "fastify" {
  export interface FastifyInstance<
    HttpServer = Server,
    HttpRequest = IncomingMessage,
    HttpResponse = ServerResponse
  > {
    authenticate: preHandlerHookHandler<
      RawServerDefault,
      IncomingMessage,
      ServerResponse<IncomingMessage>,
      RouteGenericInterface,
      unknown,
      FastifySchema,
      FastifyTypeProviderDefault,
      FastifyBaseLogger
    >;
  }
  export interface FastifyRequest {
    user: User | null;
  }
}
