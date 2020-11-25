import { CacheStore, CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { AutoCompleteUtil } from '../utils/autoComplete';
import { PokemonOfDatabase } from './model/pokemonOfDatabase.entity';
import { PokemonNames } from './pokemon.type';

@Injectable()
export class PokemonService {
  private pokemonNames: PokemonNames;

  constructor(
    @InjectRepository(PokemonOfDatabase) private readonly pokemonRepository: MongoRepository<PokemonOfDatabase>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: CacheStore,
  ) {}

  public async getPokemon(pokemonName: string): Promise<PokemonOfDatabase | null> {
    const result = await this.pokemonRepository.findOne({
      where: { name: pokemonName },
      cache: true,
    });
    return result ?? null;
  }

  public async getPokemons(page = 1, display = 10): Promise<PokemonOfDatabase[]> {
    return this.pokemonRepository.find({
      skip: (page - 1) * display,
      take: display,
      order: { no: 'ASC' },
      cache: true,
    });
  }

  public async getAutoCompleteKeyword(keyword: string, display = 10): Promise<string[]> {
    if (!this.pokemonNames?.kor) {
      const pokemons = await this.pokemonRepository.find({
        select: ['name', 'engName', 'searchCount'],
        cache: true,
      });

      const pokemonNames = pokemons.reduce<PokemonNames>(
        ({ kor, eng, count }, { name, engName, searchCount }) => ({
          kor: [...kor, name],
          eng: [...eng, engName],
          count: [...count, searchCount],
        }),
        { kor: [], eng: [], count: [] },
      );
      await this.cacheManager.set('pokemonNames', pokemonNames, { ttl: 50000 });
      this.pokemonNames = (await this.cacheManager.get<PokemonNames>('pokemonNames'))!;
    }

    const { getAutoCompleteKeyword } = new AutoCompleteUtil(this.pokemonNames);

    return getAutoCompleteKeyword(keyword)
      .filter((_, i) => i <= display)
      .sort((a, b) => a.count - b.count)
      .map(({ result }) => result);
  }
}
