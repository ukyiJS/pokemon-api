import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './env';
import { validateEnv } from './utils';

const bootstrapServer = async () => {
  validateEnv();
  await (await NestFactory.create(AppModule, { cors: true })).listen(PORT);
  Logger.log(`Server running on http://localhost:${PORT}`, 'Server');
};
bootstrapServer();
