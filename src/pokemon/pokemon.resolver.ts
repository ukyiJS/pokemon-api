import { Resolver } from '@nestjs/graphql';
import { PokemonService } from './pokemon.service';

@Resolver()
export class PokemonResolver {
  constructor(private readonly pokemonService: PokemonService) {}
}
