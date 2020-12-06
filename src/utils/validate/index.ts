import { object, string, number } from '@hapi/joi';

enum Environment {
  DEV = 'development',
  PROD = 'production',
  TEST = 'test',
}

export const validationSchema = object({
  NODE_ENV: string()
    .valid(...Object.values(Environment))
    .default(Environment.DEV),
  PORT: number().default(3000),
  SESSION_SECRET: string().required(),
  DATABASE_URL: string().required(),
});
