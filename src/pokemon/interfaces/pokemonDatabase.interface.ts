import { Field, InterfaceType } from '@nestjs/graphql';
import { EvolvingToType } from '../types/evolvingTo.type';
import { PokemonType } from '../types/pokemon.type';

@InterfaceType()
export abstract class IPokemonDatabase extends PokemonType {
  @Field(() => [EvolvingToType], { nullable: true })
  public evolvingTo?: EvolvingToType[];
  @Field(() => [PokemonType], { nullable: true })
  public differentForm?: PokemonType[];
}
