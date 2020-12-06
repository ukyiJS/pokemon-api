import { ConfigService } from '@nestjs/config';
import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';
import { Environment } from 'src/enums';
import { Env } from '../../types';
import { validationSchema } from '../../utils';

export const envConfig = (): Env => ({
  node: <Environment>process.env.NODE_ENV!,
  port: +process.env.PORT!,
  sessionSecret: process.env.SESSION_SECRET!,
  isOffline: !!process.env.IS_OFFLINE,
  database: {
    url: process.env.DATABASE_URL!,
  },
});

export const getEnv = (configService: ConfigService) => <T extends keyof Env>(key: T): Env[T] => {
  return configService.get<Env[T]>(key)!;
};

export const configOptions = <ConfigModuleOptions>{
  isGlobal: true,
  envFilePath: process.env.NODE_ENV === 'development' ? '.env.dev' : '.env.prod',
  load: [envConfig],
  validationSchema,
  validationOptions: { abortEarly: true },
};
