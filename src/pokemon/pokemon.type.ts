import { PokemonDatabase } from './model/pokemonDatabase.entity';

export type AutoCompleteKeyword = {
  result: string;
  searchCount: number;
};

export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

export type FindCondition = { $all: string[] } | { [key: string]: RegExp };
export type PokemonName = Pick<PokemonDatabase, 'name'> & Pick<PokemonDatabase, 'searchCount'>;
