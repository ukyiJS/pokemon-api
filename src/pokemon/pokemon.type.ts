export enum SearchTypes {
  NO = 'no',
  NAME = 'name',
  ENG_NAME = 'engName',
}
export type SearchType = typeof SearchTypes[keyof typeof SearchTypes];
