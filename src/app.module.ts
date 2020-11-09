import { CacheModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { CacheService, GraphqlService, TypeormService } from './config';
import { PokemonModule } from './pokemon/pokemon.module';

@Module({
  imports: [
    CacheModule.registerAsync({ useClass: CacheService }),
    GraphQLModule.forRootAsync({ useClass: GraphqlService }),
    TypeOrmModule.forRootAsync({ useClass: TypeormService }),
    PokemonModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
