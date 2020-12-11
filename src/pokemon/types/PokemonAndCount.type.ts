import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PokemonDatabase } from '../model/pokemonDatabase.entity';

@ObjectType()
export abstract class PokemonAndCount {
  @Field(() => [PokemonDatabase])
  public pokemon: PokemonDatabase[];
  @Field(() => Int)
  public count: number;
}
