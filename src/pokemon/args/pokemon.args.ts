import { ArgsType, Field } from '@nestjs/graphql';
import { PagingArgs } from './paging.args';

@ArgsType()
export class PokemonArgs extends PagingArgs {
  @Field({ nullable: true })
  no: string;
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  engName: string;
  @Field(() => [String], { nullable: true })
  types: string[];
  @Field(() => [String], { nullable: true })
  abilities: string[];
}
