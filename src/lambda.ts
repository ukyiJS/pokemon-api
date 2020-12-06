import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { APIGatewayProxyEvent, Context, ProxyResult } from 'aws-lambda';
import { createServer, proxy } from 'aws-serverless-express';
import { eventContext } from 'aws-serverless-express/middleware';
import express from 'express';
import { Server } from 'http';
import { AppModule } from './app.module';
import { createSessionStore, getEnv } from './config';

let cachedServer: Server;

const bootstrapServer = async (): Promise<Server> => {
  const expressApp = express();
  expressApp.use(eventContext());
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp), { cors: true });

  const env = getEnv(app.get(ConfigService));
  const { url } = env('database');
  const secret = env('sessionSecret');
  const sessionStore = createSessionStore(url, secret);

  await app.use(sessionStore).init();

  return createServer(expressApp);
};

export const handler = async (event: APIGatewayProxyEvent, context: Context): Promise<ProxyResult> => {
  if (!cachedServer) cachedServer = await bootstrapServer();
  return proxy(cachedServer, event, context, 'PROMISE').promise;
};
