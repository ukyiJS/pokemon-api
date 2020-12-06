import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';
import { validationSchema } from '../../utils';

export interface DatabaseEnv {
  url: string;
}
export interface PuppeteerEnv {
  browserPath: string;
  profilePath?: string;
}
export interface CrawlingEnv {
  loopCount: number;
}
export interface Env {
  port: number;
  database: DatabaseEnv;
  puppeteer: PuppeteerEnv;
  crawling: CrawlingEnv;
}

const envConfig = (): Env => ({
  port: +process.env.PORT!,
  database: {
    url: process.env.DATABASE_URL!,
  },
  puppeteer: {
    browserPath: process.env.PUPPETEER_BROWSER_PATH!,
    profilePath: process.env.PUPPETEER_PROFILE_PATH,
  },
  crawling: {
    loopCount: +process.env.LOOP_COUNT!,
  },
});

export const configOptions = <ConfigModuleOptions>{
  isGlobal: true,
  envFilePath: process.env.NODE_ENV === 'development' ? '.env.dev' : '.env.prod',
  load: [envConfig],
  validationSchema,
  validationOptions: { abortEarly: true },
};
