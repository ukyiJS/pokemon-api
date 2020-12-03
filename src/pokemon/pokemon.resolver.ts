import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { FindAndModifyWriteOpResultObject } from 'typeorm';
import { AutoCompleteArgs } from './args/autoComplete.args';
import { PokemonArgs } from './args/pokemon.args';
import { PokemonDatabase } from './model/pokemonDatabase.entity';
import { PokemonService } from './pokemon.service';

@Resolver(() => PokemonDatabase)
export class PokemonResolver {
  constructor(private readonly pokemonService: PokemonService) {}

  @Query(() => PokemonDatabase, { nullable: true })
  public async getPokemon(@Args('pokemonName') pokemonName: string): Promise<FindAndModifyWriteOpResultObject> {
    return this.pokemonService.getPokemon(pokemonName);
  }

  @Query(() => [PokemonDatabase])
  public async getPokemons(@Args({ nullable: true }) pokemonArgs: PokemonArgs): Promise<PokemonDatabase[]> {
    return this.pokemonService.getPokemons(pokemonArgs);
  }

  @ResolveField(() => [String])
  public abilities(@Parent() { abilities }: PokemonDatabase): string[] {
    return abilities.filter(ability => ability);
  }

  @Query(() => [String])
  public async getAutoCompleteKeyword(@Args() autoCompleteArgs: AutoCompleteArgs): Promise<string[]> {
    return this.pokemonService.getAutoCompleteKeyword(autoCompleteArgs);
  }
}
