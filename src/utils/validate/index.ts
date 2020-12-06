import { number, object, string } from '@hapi/joi';
import { Environments } from '../../pokemon/enums/environment.enum';

export const validationSchema = object({
  NODE_ENV: string()
    .valid(...Object.values(Environments))
    .default(Environments.DEV),
  PORT: number().default(3000),
  SESSION_SECRET: string().required(),
  DATABASE_URL: string().required(),
});
