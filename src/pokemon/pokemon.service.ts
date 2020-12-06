import { CacheStore, CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Entries, FindCondition, PokemonName, Session } from '../types';
import { AutoCompleteService } from '../utils';
import { AutoCompleteArgs } from './args/autoComplete.args';
import { PokemonArgs } from './args/pokemon.args';
import { PokemonDatabase } from './model/pokemonDatabase.entity';
import { Sessions } from './model/session.entity';

@Injectable()
export class PokemonService {
  @InjectRepository(PokemonDatabase)
  private readonly pokemonRepository: MongoRepository<PokemonDatabase>;
  @InjectRepository(Sessions)
  private readonly sessionRepository: MongoRepository<Sessions>;
  @Inject(CACHE_MANAGER)
  private readonly cacheManager: CacheStore;
  @Inject(AutoCompleteService)
  private readonly autoCompleteService: AutoCompleteService;

  public getPokemon = async (pokemonName: string): Promise<PokemonDatabase[]> => {
    const keyName = `name.${/^[a-z]+$/gi.test(pokemonName) ? 'eng' : 'kor'}`;
    return this.pokemonRepository
      .findOneAndUpdate({ [keyName]: RegExp(`^${pokemonName}+$`, 'i') }, { $inc: { searchCount: 1 } }, { returnOriginal: false })
      .then(({ value }) => <PokemonDatabase[]>value);
  };

  public getPokemons = async ({ page, display, ...pokemon }: PokemonArgs): Promise<PokemonDatabase[]> => {
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
  };

  public getPokemonNames = async (): Promise<Pick<PokemonDatabase, 'name' | 'searchCount'>[]> => {
    return this.pokemonRepository.find({
      select: ['name', 'searchCount'],
      cache: true,
    });
  };

  public getAutoCompleteKeyword = async ({ keyword, display }: AutoCompleteArgs, session: Session): Promise<string[]> => {
    let pokemonNames = <PokemonName[]>[];
    const getCache = async () => this.cacheManager.get<PokemonName[]>('pokemonNames');
    const getSession = async () => {
      return this.sessionRepository.findOne({ select: ['session'] }).then(result => result?.session?.pokemonNames);
    };

    if (!(await getCache())) {
      const sessionPokemonNames = await getSession();
      pokemonNames = sessionPokemonNames ?? (await this.getPokemonNames());
      if (!sessionPokemonNames) session.pokemonNames = pokemonNames;

      await this.cacheManager.set('pokemonNames', pokemonNames, { ttl: 1000 * 60 * 60 * 24 });
    }
    pokemonNames = (await getCache()) ?? pokemonNames;

    return this.autoCompleteService
      .getAutoCompleteKeyword(keyword, pokemonNames)
      .filter((_, i) => i <= display)
      .sort((a, b) => a.searchCount - b.searchCount)
      .map(({ result }) => result);
  };
}
