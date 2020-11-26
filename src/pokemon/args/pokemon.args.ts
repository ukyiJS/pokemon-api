import { ArgsType, Field } from '@nestjs/graphql';
import { PokemonType, PokemonTypes } from '../pokemon.type';
import { PagingArgs } from './paging.args';

@ArgsType()
export class PokemonArgs extends PagingArgs {
  @Field({ nullable: true })
  no: string;
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  engName: string;
  @Field(() => [PokemonTypes], { nullable: true })
  types: PokemonType[];
  @Field(() => [String], { nullable: true })
  abilities: string[];
}
