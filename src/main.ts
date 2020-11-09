import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter, LoggingInterceptor, TimeoutInterceptor } from './common';
import { PORT } from './env';
import { validateEnv } from './utils';

const bootstrapServer = async () => {
  validateEnv();
  const app = await NestFactory.create(AppModule, { cors: true });
  await app
    .useGlobalFilters(new HttpExceptionFilter())
    .useGlobalInterceptors(new LoggingInterceptor(), new TimeoutInterceptor())
    .useGlobalPipes(new ValidationPipe({ forbidUnknownValues: true }))
    .listen(PORT);

  Logger.log(`Server running on http://localhost:${PORT}`, 'Server');
};
bootstrapServer();
