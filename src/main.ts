import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { sessionStore } from './config/session';
import { PORT } from './env';
import { validateEnv } from './utils';

const bootstrapServer = async () => {
  validateEnv();
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.use(sessionStore).listen(PORT);

  Logger.log(`Server running on http://localhost:${PORT}`, 'Server');
};
bootstrapServer();
