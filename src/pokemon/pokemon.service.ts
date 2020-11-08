import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { PokemonOfDatabase } from './model/pokemonOfDatabase.entity';

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(PokemonOfDatabase) private readonly pokemonRepository: MongoRepository<PokemonOfDatabase>,
  ) {}

  public async getPokemons(page = 1, display = 10): Promise<PokemonOfDatabase[]> {
    return this.pokemonRepository.find({
      skip: (page - 1) * display,
      take: display,
      order: { no: 'ASC' },
      cache: true,
    });
  }
}
