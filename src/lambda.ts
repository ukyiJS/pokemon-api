import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { APIGatewayProxyEvent, Context, ProxyResult } from 'aws-lambda';
import { createServer, proxy } from 'aws-serverless-express';
import { eventContext } from 'aws-serverless-express/middleware';
import express from 'express';
import { Server } from 'http';
import { AppModule } from './app.module';

let cachedServer: Server;

const bootstrapServer = async (): Promise<Server> => {
  const expressApp = express();
  expressApp.use(eventContext());
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp), { cors: true });
  await app.init();

  return createServer(expressApp);
};

export const handler = async (event: APIGatewayProxyEvent, context: Context): Promise<ProxyResult> => {
  if (!cachedServer) cachedServer = await bootstrapServer();
  return proxy(cachedServer, event, context, 'PROMISE').promise;
};