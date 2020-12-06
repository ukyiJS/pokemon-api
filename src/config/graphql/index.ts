import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlModuleOptions, GqlOptionsFactory, registerEnumType } from '@nestjs/graphql';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { ObjectLiteral } from 'typeorm';
import { Environment, Environments } from '../../pokemon/enums/environment.enum';
import { PokemonTypes } from '../../pokemon/enums/pokemonType.enum';
import { getEnv } from '../env';

type GraphQLOptions = { [mode in Exclude<Environment, Environments.TEST>]: GqlModuleOptions };

@Injectable()
export class GraphqlService implements GqlOptionsFactory {
  private readonly endpoint = '/api/graphql';
  private mode: keyof GraphQLOptions;
  private options: GraphQLOptions;
  private config = getEnv(this.configService);

  constructor(private readonly configService: ConfigService) {
    this.mode = <keyof GraphQLOptions>this.config('node');
    this.options = {
      development: { path: !this.config('isOffline') ? this.endpoint : undefined, tracing: true },
      production: { cacheControl: { defaultMaxAge: 5, stripFormattedExtensions: false, calculateHttpHeaders: false } },
    };
    registerEnumType(PokemonTypes, { name: 'PokemonTypes' });
  }

  public createGqlOptions = async (): Promise<GqlModuleOptions> => {
    return {
      ...this.options[this.mode],
      cors: true,
      autoSchemaFile: true,
      playground: { endpoint: this.endpoint },
      introspection: true,
      formatError: (error: GraphQLError): GraphQLFormattedError & ObjectLiteral => ({
        message: error.message,
        code: error.extensions?.code,
        locations: error.locations,
        path: error.path,
      }),
    };
  };
}
