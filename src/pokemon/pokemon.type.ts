export enum SearchTypes {
  KOR = 'kor',
  ENG = 'eng',
}
export type SearchType = typeof SearchTypes[keyof typeof SearchTypes];
