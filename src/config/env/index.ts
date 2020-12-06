import { ConfigService } from '@nestjs/config';
import { Environment } from 'src/pokemon/enums/environment.enum';

export interface DatabaseEnv {
  url: string;
}
export interface IEnvironment {
  node: Environment;
  port: number;
  isOffline?: string;
  sessionSecret: string;
  database: DatabaseEnv;
}

export const envConfig = (): IEnvironment => ({
  node: <Environment>process.env.NODE_ENV!,
  port: +process.env.PORT!,
  sessionSecret: process.env.SESSION_SECRET!,
  isOffline: process.env.IS_OFFLINE,
  database: {
    url: process.env.DATABASE_URL!,
  },
});

export const getEnv = (configService: ConfigService) => <T extends keyof IEnvironment>(key: T): IEnvironment[T] => {
  return configService.get<IEnvironment[typeof key]>(key)!;
};
