export enum Environments {
  DEV = 'development',
  PROD = 'production',
  TEST = 'test',
}

export type Environment = typeof Environments[keyof typeof Environments];
