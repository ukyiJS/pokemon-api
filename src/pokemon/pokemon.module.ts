import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheService } from 'src/config';
import { PokemonOfDatabase } from './model/pokemonOfDatabase.entity';
import { PokemonResolver } from './pokemon.resolver';
import { PokemonService } from './pokemon.service';

@Module({
  providers: [PokemonService, PokemonResolver],
  imports: [CacheModule.registerAsync({ useClass: CacheService }), TypeOrmModule.forFeature([PokemonOfDatabase])],
  exports: [PokemonService],
})
export class PokemonModule {}
