export interface DatabaseEnv {
  url: string;
}
export interface Env {
  port: number;
  sessionSecret: string;
  database: DatabaseEnv;
}

export const envConfig = (): Env => ({
  port: +process.env.PORT!,
  sessionSecret: process.env.SESSION_SECRET!,
  database: {
    url: process.env.DATABASE_URL!,
  },
});
