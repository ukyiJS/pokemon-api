export enum SearchTypes {
  KOR = 'kor',
  ENG = 'eng',
}
export type SearchType = typeof SearchTypes[keyof typeof SearchTypes];

export type PokemonNames = {
  kor: string[];
  eng: string[];
  count: number[];
};

export type AutoCompleteKeyword = {
  result: string;
  count: number;
};
