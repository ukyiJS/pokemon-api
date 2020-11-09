import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonOfDatabase } from './model/pokemonOfDatabase.entity';
import { PokemonResolver } from './pokemon.resolver';
import { PokemonService } from './pokemon.service';

@Module({
  providers: [PokemonService, PokemonResolver],
  imports: [TypeOrmModule.forFeature([PokemonOfDatabase])],
  exports: [PokemonService],
})
export class PokemonModule {}
