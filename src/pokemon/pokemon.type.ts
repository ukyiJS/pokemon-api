import { registerEnumType } from '@nestjs/graphql';

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

export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

export type FindCondition = { $all: string[] } | { [key: string]: RegExp };

export enum PokemonTypes {
  NORMAL = '노말',
  FIRE = '불',
  WATER = '물',
  ELECTRIC = '전기',
  GRASS = '풀',
  ICE = '얼음',
  FIGHTING = '격투',
  POISON = '독',
  GROUND = '땅',
  FLYING = '비행',
  PSYCHIC = '에스퍼',
  BUG = '벌레',
  ROCK = '바위',
  GHOST = '고스트',
  DRAGON = '드래곤',
  DARK = '악',
  STEEL = '강철',
  FAIRY = '페어리',
}
export type PokemonType = typeof PokemonTypes[keyof typeof PokemonTypes];
registerEnumType(PokemonTypes, { name: 'PokemonTypes' });
