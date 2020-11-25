import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { GraphqlService, TypeormService } from './config';
import { PokemonModule } from './pokemon/pokemon.module';

@Module({
  providers: [{ provide: APP_PIPE, useClass: ValidationPipe }],
  imports: [
    GraphQLModule.forRootAsync({ useClass: GraphqlService }),
    TypeOrmModule.forRootAsync({ useClass: TypeormService }),
    PokemonModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
