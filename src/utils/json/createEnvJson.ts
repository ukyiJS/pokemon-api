import { config } from 'dotenv';
import { join } from 'path';
import { writeJson } from './index';

const path = join(process.cwd(), process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev');
config({ path });

const createEnvJson = () => {
  const { NODE_ENV = 'development', DATABASE_URL, SESSION_SECRET } = process.env;
  writeJson({ fileName: 'env', data: { NODE_ENV, DATABASE_URL, SESSION_SECRET } });
};

createEnvJson();
