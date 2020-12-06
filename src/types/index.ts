import { GqlModuleOptions } from '@nestjs/graphql';
import { Cookie } from 'express-session';
import { Environment, Environments } from '../enums';
import { PokemonDatabase } from '../pokemon/model/pokemonDatabase.entity';

export type Entries<T> = { [K in keyof T]: [K, T[K]] }[keyof T][];

export type FindCondition = { $all: string[] } | { [key: string]: RegExp };

export type PokemonName = Pick<PokemonDatabase, 'name'> & Pick<PokemonDatabase, 'searchCount'>;

export type AutoCompleteKeyword = { result: string; searchCount: number };

export type GetJson = { dirName?: string; fileName: string };

export type WriteJson<T> = { data: T } & GetJson;

export type MergedJson = { fileNames: string[]; dirName?: string };

export type GraphQLOptions = { [mode in Exclude<Environment, Environments.TEST>]: GqlModuleOptions };

export type DatabaseEnv = { url: string };

export type Env = { node: Environment; port: number; sessionSecret: string; isOffline: boolean; database: DatabaseEnv };

export type Session = { cookie: Cookie; pokemonNames: PokemonName[]; [key: string]: any };
