import { CacheStore, CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { AutoCompleteUtil } from '../utils/autoComplete';
import { AutoCompleteArgs } from './args/autoComplete.args';
import { PokemonArgs } from './args/pokemon.args';
import { PokemonDatabase } from './model/pokemonDatabase.entity';
import { Session, Sessions } from './model/session.entity';
import { Entries, FindCondition, PokemonName } from './pokemon.type';

@Injectable()
export class PokemonService {
  @InjectRepository(PokemonDatabase)
  private readonly pokemonRepository: MongoRepository<PokemonDatabase>;
  @InjectRepository(Sessions)
  private readonly sessionRepository: MongoRepository<Sessions>;
  @Inject(CACHE_MANAGER)
  private readonly cacheManager?: CacheStore;

  public async getPokemon(pokemonName: string): Promise<PokemonDatabase[]> {
    const keyName = `name.${/^[a-z]+$/gi.test(pokemonName) ? 'eng' : 'kor'}`;
    return this.pokemonRepository
      .findOneAndUpdate(
        { [keyName]: RegExp(`^${pokemonName}+$`, 'i') },
        { $inc: { searchCount: 1 } },
        { returnOriginal: false },
      )
      .then(({ value }) => <PokemonDatabase[]>value);
  }

  public async getPokemons({ page, display, ...pokemon }: PokemonArgs): Promise<PokemonDatabase[]> {
    const condition = <FindCondition>(<Entries<PokemonArgs>>Object.entries(pokemon)).reduce((acc, [key, value]) => {
      if (/page|display/.test(key)) return acc;

      const keyName = key === 'name' ? `name.${/^[a-z]+$/gi.test(pokemon[key]) ? 'eng' : 'kor'}` : key;
      const condition = Array.isArray(value) ? { $all: value } : RegExp(`^${value}`, 'gi');
      return { ...acc, [keyName]: condition };
    }, {});

    return this.pokemonRepository.find({
      skip: (page - 1) * display,
      take: display,
      order: { no: 'ASC' },
      where: condition,
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
