import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheService } from '../config';
import { PokemonDatabase } from './model/pokemonDatabase.entity';
import { PokemonResolver } from './pokemon.resolver';
import { PokemonService } from './pokemon.service';

@Module({
  providers: [PokemonService, PokemonResolver],
  imports: [CacheModule.registerAsync({ useClass: CacheService }), TypeOrmModule.forFeature([PokemonDatabase])],
  exports: [PokemonService],
})
export class PokemonModule {}
