import { IS_OFFLINE, IS_PRODUCTION } from '@/env';
import { Injectable } from '@nestjs/common';
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { join } from 'path';
import { ObjectLiteral } from 'typeorm';

@Injectable()
export class GraphqlService implements GqlOptionsFactory {
  private readonly isProduction = IS_PRODUCTION && !IS_OFFLINE;
  private options: GqlModuleOptions;

  constructor() {
    this.options = this.isProduction ? this.getProdOptions() : this.getDevOptions();
  }

  private getProdOptions = (): GqlModuleOptions => ({
    typePaths: ['dist/*.gql'],
    cacheControl: { defaultMaxAge: 5, stripFormattedExtensions: false, calculateHttpHeaders: false },
  });

  private getDevOptions = (): GqlModuleOptions => ({
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    tracing: true,
  });

  public createGqlOptions = async (): Promise<GqlModuleOptions> => {
    return {
      ...this.options,
      cors: true,
      playground: true,
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
