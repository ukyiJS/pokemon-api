import { Args, Query, Resolver } from '@nestjs/graphql';
import { FindAndModifyWriteOpResultObject } from 'typeorm';
import { AutoCompleteArgs } from './args/autoComplete.args';
import { PagingArgs } from './args/paging.args';
import { PokemonOfDatabase } from './model/pokemonOfDatabase.entity';
import { PokemonService } from './pokemon.service';

@Resolver(() => PokemonOfDatabase)
export class PokemonResolver {
  constructor(private readonly pokemonService: PokemonService) {}

  @Query(() => PokemonOfDatabase, { nullable: true })
  public async getPokemon(@Args('pokemonName') pokemonName: string): Promise<FindAndModifyWriteOpResultObject> {
    return this.pokemonService.getPokemon(pokemonName);
  }

  @Query(() => [PokemonOfDatabase])
  public async getPokemons(@Args() pagingArgs: PagingArgs): Promise<PokemonOfDatabase[]> {
    return this.pokemonService.getPokemons(pagingArgs);
  }

  @Query(() => [String])
  public async getAutoCompleteKeyword(@Args() autoCompleteArgs: AutoCompleteArgs): Promise<string[]> {
    return this.pokemonService.getAutoCompleteKeyword(autoCompleteArgs);
  }
}
