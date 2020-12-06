import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createSessionStore, getEnv } from './config';

const bootstrapServer = async () => {
  const app = await NestFactory.create(AppModule, { cors: true });

  const env = getEnv(app.get(ConfigService));
  const { url } = env('database');
  const secret = env('sessionSecret');
  const port = env('port');
  const sessionStore = createSessionStore(url, secret);

  await app.use(sessionStore).listen(port);

  Logger.log(`🚀 Server running on http://localhost:${port}`, 'Server');
};
bootstrapServer();
