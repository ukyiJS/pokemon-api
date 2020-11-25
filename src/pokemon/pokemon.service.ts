import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { AutoCompleteUtil } from '../utils/autoComplete';
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

  public async getAutoCompleteKeyword(keyword: string, page = 1, display = 10): Promise<string[]> {
    const { searchType, matchedTexts } = await this.getMatchedTexts(keyword);

    return this.pokemonRepository
      .find({
        select: [searchType],
        skip: (page - 1) * display,
        take: display,
        cache: true,
        where: { [searchType]: { $in: matchedTexts } },
      })
      .then(pokemons => pokemons.map(pokemon => pokemon[searchType]));
  }
}
