import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { ObjectLiteral } from 'typeorm';
import { AutoCompleteArgs } from '../args/autoComplete.args';
import { PokemonService } from '../pokemon.service';

@Resolver()
export class AutoCompleteResolver {
  constructor(private readonly pokemonService: PokemonService) {}

  @Query(() => [String])
  public async getAutoCompleteKeyword(@Args() autoCompleteArgs: AutoCompleteArgs, @Context('req') req: ObjectLiteral): Promise<string[]> {
    return this.pokemonService.getAutoCompleteKeyword(autoCompleteArgs, req.session);
  }
}
