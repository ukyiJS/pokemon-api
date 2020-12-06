import { ArgsType, Field } from '@nestjs/graphql';
import { PokemonType, PokemonTypes } from '../enums/pokemonType.enum';
import { PagingArgs } from './paging.args';

@ArgsType()
export class PokemonArgs extends PagingArgs {
  @Field({ nullable: true })
  no: string;
  @Field({ nullable: true })
  name: string;
  @Field(() => [PokemonTypes], { nullable: true })
  types: PokemonType[];
  @Field(() => [String], { nullable: true })
  abilities: string[];
}
