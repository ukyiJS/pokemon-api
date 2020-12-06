import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createSessionStore } from './config';

const bootstrapServer = async () => {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config = app.get(ConfigService);
  const port = config.get('port');
  const sessionStore = createSessionStore(app);

  await app.use(sessionStore).listen(port);

  Logger.log(`🚀 Server running on http://localhost:${port}`, 'Server');
};
bootstrapServer();
