import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { sessionStore } from './config/session';

const bootstrapServer = async () => {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config = app.get(ConfigService);
  const port = config.get('port');

  await app.use(sessionStore).listen(port);

  Logger.log(`🚀 Server running on http://localhost:${port}`, 'Server');
};
bootstrapServer();
