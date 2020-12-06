import { writeJson } from './json';

const { NODE_ENV, DATABASE_URL } = process.env;
writeJson({
  data: { NODE_ENV, DATABASE_URL },
  fileName: 'env',
});
