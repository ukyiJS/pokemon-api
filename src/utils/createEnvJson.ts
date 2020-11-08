import {
  DOMAIN,
  IS_PRODUCTION,
  MONGODB_DATABASE,
  MONGODB_HOST,
  MONGODB_PASS,
  MONGODB_USER,
  MONGODB_PORT,
  NODE_ENV,
} from '@/env';
import { writeJson } from './json';

const fileName = `env.${IS_PRODUCTION ? 'prod' : 'dev'}`;
writeJson({
  data: {
    NODE_ENV,
    DOMAIN,
    MONGODB_PORT,
    MONGODB_USER,
    MONGODB_PASS,
    MONGODB_HOST,
    MONGODB_DATABASE,
  },
  fileName,
  dirName: 'src',
});
