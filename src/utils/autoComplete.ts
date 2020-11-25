import { assemble, disassemble, isConsonantAll } from 'hangul-js';
import { PokemonNames, SearchType, SearchTypes } from '../pokemon/pokemon.type';

export class AutoCompleteUtil {
  private searchKeyword: string;
  private searchType: SearchType;

  constructor(private readonly pokemonNames: PokemonNames) {}

  constructor(
    private readonly pokemonRepository: MongoRepository<PokemonOfDatabase>,
    private readonly cacheManager: CacheStore,
  ) {}

  public getSearchType = (): SearchType => this.searchType;

  private equals = (searchText: string, regExp: string): boolean => {
    return new RegExp(`^${regExp}`, 'gi').test(searchText);
  };

  private disassembleText = (text: string) => disassemble(text).join('');

  private initAutoCompleteKeyword = async (): Promise<void> => {
    if (this.pokemonNames && this.pokemonEngNames) return;

    const pokemons = await this.pokemonRepository.find({ select: ['name', 'engName'], cache: true });
    const [names, engNames] = pokemons.reduce<string[][]>(
      ([accName, accEngName], { name, engName }) => {
        return [
          [...accName, name],
          [...accEngName, engName],
        ];
      },
      [[], []],
    );
    await this.cacheManager.set('pokemonNames', names, { ttl: 50000 });
    await this.cacheManager.set('pokemonEngNames', engNames, { ttl: 50000 });
    this.pokemonNames = (await this.cacheManager.get<string[]>('pokemonNames'))!;
    this.pokemonEngNames = (await this.cacheManager.get<string[]>('pokemonEngNames'))!;
  };

  private filterByChoSeong = (): string[] => {
    return this.pokemonNames.filter(name => {
      const choSeongKeyword = [...name].map(text => disassemble(text)[0]).join('');
      const searchKeyword = this.disassembleText(this.searchKeyword);
      return this.equals(choSeongKeyword, searchKeyword);
    });
  };

  private filterByKeyword = (): string[] => {
    const pokemonNames = this.searchType === SearchTypes.NAME ? this.pokemonNames : this.pokemonEngNames;
    return pokemonNames.filter(name => {
      const keywordToFilter = this.disassembleText(name);
      const searchKeyword = this.disassembleText(this.searchKeyword);
      return this.equals(keywordToFilter, searchKeyword);
    });
  };

  public getMatchedTexts = async (keyword: string): Promise<string[]> => {
    await this.initAutoCompleteKeyword();
    this.searchType = /^[ㄱ-ㅎ가-힣]/.test(keyword) ? SearchTypes.NAME : SearchTypes.ENG_NAME;
    this.searchKeyword = assemble(disassemble(keyword));

    const matchedTexts = isConsonantAll(keyword) ? this.filterByChoSeong() : this.filterByKeyword();
    return matchedTexts;
  };
}
