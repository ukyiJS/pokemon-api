import { DOMAIN, MONGODB_DATABASE, MONGODB_HOST, MONGODB_PASS, MONGODB_PORT, MONGODB_USER, NODE_ENV } from '../env';
import { writeJson } from './json';

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
  fileName: 'env',
});
