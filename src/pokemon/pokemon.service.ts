import { CacheStore, CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindAndModifyWriteOpResultObject, MongoRepository } from 'typeorm';
import { AutoCompleteUtil } from '../utils/autoComplete';
import { AutoCompleteArgs } from './args/autoComplete.args';
import { PokemonArgs } from './args/pokemon.args';
import { PokemonDatabase } from './model/pokemonDatabase.entity';
import { Session, Sessions } from './model/session.entity';
import { Entries, FindCondition, PokemonName } from './pokemon.type';

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(PokemonDatabase) private readonly pokemonRepository: MongoRepository<PokemonDatabase>,
    @InjectRepository(Sessions) private readonly sessionRepository: MongoRepository<Sessions>,
    @Inject(CACHE_MANAGER) private readonly cacheManager?: CacheStore,
  ) {}

  public async getPokemon(pokemonName: string): Promise<FindAndModifyWriteOpResultObject> {
    return this.pokemonRepository
      .findOneAndUpdate({ name: pokemonName }, { $inc: { searchCount: 1 } }, { returnOriginal: false })
      .then(({ value }) => value);
  }

  public async getPokemons({ page, display, ...pokemon }: PokemonArgs): Promise<PokemonDatabase[]> {
    const findCondition = <FindCondition>(<Entries<PokemonArgs>>Object.entries(pokemon)).reduce((acc, [key, value]) => {
      if (/page|display/.test(key)) return acc;

      const findCondition = Array.isArray(value) ? { $all: value } : new RegExp(`^${value}`, 'gi');
      return { ...acc, [key]: findCondition };
    }, {});

    return this.pokemonRepository.find({
      skip: (page - 1) * display,
      take: display,
      order: { no: 'ASC' },
      where: findCondition,
      cache: true,
    });
  }

  public async getPokemonNames(): Promise<(Pick<PokemonDatabase, 'name'> & Pick<PokemonDatabase, 'searchCount'>)[]> {
    return this.pokemonRepository.find({
      select: ['name', 'searchCount'],
      cache: true,
    });
  }

  public async getAutoCompleteKeyword({ keyword, display }: AutoCompleteArgs, session: Session): Promise<string[]> {
    let pokemonNames = <PokemonName[]>[];
    const getCache = async () => this.cacheManager?.get<PokemonName[]>('pokemonNames');
    const getSession = async () => {
      return this.sessionRepository.findOne({ select: ['session'] }).then(result => result?.session?.pokemonNames);
    };

    if (!(await getCache())) {
      const sessionPokemonNames = await getSession();
      pokemonNames = sessionPokemonNames ?? (await this.getPokemonNames());
      await this.cacheManager?.set('pokemonNames', pokemonNames, { ttl: 1000 * 60 * 60 * 24 });

      if (!sessionPokemonNames) session.pokemonNames = pokemonNames;
    }
    pokemonNames = (await getCache()) ?? pokemonNames;

    const { getAutoCompleteKeyword } = new AutoCompleteUtil(pokemonNames);

    return getAutoCompleteKeyword(keyword)
      .filter((_, i) => i <= display)
      .sort((a, b) => a.searchCount - b.searchCount)
      .map(({ result }) => result);
  }
}
