import { Logger } from '@nestjs/common';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

interface GetJson {
  dirName?: string;
  fileName: string;
}

interface WriteJson<T> extends GetJson {
  data: T;
}

interface MergedJson {
  fileNames: string[];
  dirName?: string;
}

const encoding = <BufferEncoding>'utf-8';

export const getJson = <T>({ fileName, dirName = 'src/assets/json' }: GetJson): T | null => {
  const dir = join(process.cwd(), dirName, fileName);
  const isExists = existsSync(dir);
  return isExists ? <T>JSON.parse(readFileSync(dir, encoding)) : null;
};

export const mergeJson = <T>({ fileNames, dirName = 'src/assets/json' }: MergedJson): T[] => {
  const dir = join(process.cwd(), dirName);
  return fileNames.map<T>(json => JSON.parse(readFileSync(join(dir, json), encoding)));
};

export const writeJson = <T>({ data, fileName, dirName = '' }: WriteJson<T>): void => {
  const saveDir = join(process.cwd(), dirName);
  const jsonFileName = `${saveDir}/${fileName}.json`;

  if (!existsSync(saveDir)) {
    mkdirSync(saveDir);
    Logger.log(saveDir, 'CreateDirectory');
  }

  writeFileSync(jsonFileName, JSON.stringify(data));
  Logger.log(jsonFileName, 'WriteFile');
};
