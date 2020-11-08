import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { PokemonOfDatabase } from './model/pokemonOfDatabase.entity';
import { PokemonService } from './pokemon.service';

@Resolver()
export class PokemonResolver {
  constructor(private readonly pokemonService: PokemonService) {}

  @Query(() => [PokemonOfDatabase])
  public async getPokemons(
    @Args('page', { type: () => Int, nullable: true }) page?: number,
    @Args('display', { type: () => Int, nullable: true }) display?: number,
  ): Promise<PokemonOfDatabase[]> {
    return this.pokemonService.getPokemons(page, display);
  }

  @Query(() => [String])
  public async getAutoCompleteKeyword(
    @Args('keyword') keyword: string,
    @Args('page', { type: () => Int, nullable: true }) page?: number,
    @Args('display', { type: () => Int, nullable: true }) display?: number,
  ): Promise<string[]> {
    return this.pokemonService.getAutoCompleteKeyword(keyword, page, display);
  }
}
