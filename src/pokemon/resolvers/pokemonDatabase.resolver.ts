import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { PokemonArgs } from '../args/pokemon.args';
import { PokemonDatabase } from '../model/pokemonDatabase.entity';
import { PokemonService } from '../pokemon.service';

@Resolver(() => PokemonDatabase)
export class PokemonDatabaseResolver {
  constructor(private readonly pokemonService: PokemonService) {}

  @Query(() => PokemonDatabase, { nullable: true })
  public async getPokemon(@Args('pokemonName') pokemonName: string): Promise<PokemonDatabase[]> {
    return this.pokemonService.getPokemon(pokemonName);
  }

  @Query(() => [PokemonDatabase])
  public async getPokemons(@Args({ nullable: true }) pokemonArgs: PokemonArgs): Promise<PokemonDatabase[]> {
    return this.pokemonService.getPokemons(pokemonArgs);
  }

  @Query(() => Int)
  public async getPokemonCount(): Promise<number> {
    return this.pokemonService.getPokemonCount();
  }
}
