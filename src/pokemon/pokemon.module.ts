import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheService } from '../config';
import { PokemonDatabase } from './model/pokemonDatabase.entity';
import { Sessions } from './model/session.entity';
import * as resolvers from './resolvers';
import { PokemonService } from './pokemon.service';

@Module({
  providers: [PokemonService, ...Object.values(resolvers)],
  imports: [
    CacheModule.registerAsync({ useClass: CacheService }),
    TypeOrmModule.forFeature([PokemonDatabase, Sessions]),
  ],
})
export class PokemonModule {}
