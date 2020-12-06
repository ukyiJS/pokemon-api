import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutoCompleteModule } from 'src/utils';
import { CacheService } from '../config';
import { PokemonDatabase } from './model/pokemonDatabase.entity';
import { Sessions } from './model/session.entity';
import { PokemonService } from './pokemon.service';
import * as resolvers from './resolvers';

@Module({
  providers: [PokemonService, ...Object.values(resolvers)],
  imports: [TypeOrmModule.forFeature([PokemonDatabase, Sessions]), CacheModule.registerAsync({ useClass: CacheService }), AutoCompleteModule],
})
export class PokemonModule {}
