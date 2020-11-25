import { Logger } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { FindAndModifyWriteOpResultObject } from 'typeorm';
import { AutoCompleteArgs } from './args/autoComplete.args';
import { PokemonArgs } from './args/pokemon.args';
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
  public async getPokemons(@Args({ nullable: true }) pokemonArgs: PokemonArgs): Promise<PokemonOfDatabase[]> {
    return this.pokemonService.getPokemons(pokemonArgs);
  }

  @ResolveField(() => String, { nullable: true })
  public async hiddenAbility(@Parent() { abilities }: PokemonOfDatabase): Promise<string> {
    return abilities[2];
  }

  @ResolveField(() => [String])
  public abilities(@Parent() { abilities }: PokemonOfDatabase): string[] {
    return abilities.filter(ability => ability);
  }

  @Query(() => [String])
  public async getAutoCompleteKeyword(@Args() autoCompleteArgs: AutoCompleteArgs): Promise<string[]> {
    return this.pokemonService.getAutoCompleteKeyword(autoCompleteArgs);
  }
}
