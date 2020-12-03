import { Injectable } from '@nestjs/common';
import { GqlModuleOptions, GqlOptionsFactory, registerEnumType } from '@nestjs/graphql';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { PokemonTypes } from 'src/pokemon/enums/pokemonType.enum';
import { ObjectLiteral } from 'typeorm';
import { IS_OFFLINE, IS_PRODUCTION } from '../../env';

@Injectable()
export class GraphqlService implements GqlOptionsFactory {
  private readonly endpoint = '/api/graphql';
  private options: GqlModuleOptions;

  constructor() {
    this.options = IS_PRODUCTION ? this.getProdOptions() : this.getDevOptions();
    registerEnumType(PokemonTypes, { name: 'PokemonTypes' });
  }

  private getProdOptions = (): GqlModuleOptions => ({
    cacheControl: { defaultMaxAge: 5, stripFormattedExtensions: false, calculateHttpHeaders: false },
  });

  private getDevOptions = (): GqlModuleOptions => ({
    path: !IS_OFFLINE ? this.endpoint : undefined,
    tracing: true,
  });

  public createGqlOptions = async (): Promise<GqlModuleOptions> => {
    return {
      ...this.options,
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
