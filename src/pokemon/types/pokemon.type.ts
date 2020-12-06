import { ObjectType } from '@nestjs/graphql';
import { IPokemon } from '../interfaces/pokemon.interface';

@ObjectType()
export abstract class PokemonType extends IPokemon {}
