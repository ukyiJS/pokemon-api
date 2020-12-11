import { Args, Query, Resolver } from '@nestjs/graphql';
import { PokemonArgs } from '../args/pokemon.args';
import { PokemonDatabase } from '../model/pokemonDatabase.entity';
import { PokemonService } from '../pokemon.service';
import { PokemonAndCount } from '../types/PokemonAndCount.type';

@Resolver(() => PokemonDatabase)
export class PokemonDatabaseResolver {
  constructor(private readonly pokemonService: PokemonService) {}

  @Query(() => PokemonDatabase, { nullable: true })
  public async getPokemon(@Args('pokemonName') pokemonName: string): Promise<PokemonDatabase[]> {
    return this.pokemonService.getPokemon(pokemonName);
  }

  @Query(() => PokemonAndCount)
  public async getPokemons(@Args({ nullable: true }) pokemonArgs: PokemonArgs): Promise<PokemonAndCount> {
    return this.pokemonService.getPokemons(pokemonArgs);
  }
}
