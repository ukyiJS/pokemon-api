import { assemble, disassemble, isConsonantAll } from 'hangul-js';
import { MongoRepository } from 'typeorm';
import { PokemonOfDatabase } from '../pokemon/model/pokemonOfDatabase.entity';
import { SearchType, SearchTypes } from '../pokemon/pokemon.type';

export class AutoCompleteUtil {
  private pokemonNames: string[];
  private pokemonEngNames: string[];
  private searchKeyword: string;
  private searchType: SearchType;

  constructor(private readonly pokemonRepository: MongoRepository<PokemonOfDatabase>) {}

  public getSearchType = (): SearchType => this.searchType;

  private equals = (searchText: string, regExp: string): boolean => {
    return new RegExp(`^${regExp}`, 'gi').test(searchText);
  };

  private disassembleText = (text: string) => disassemble(text).join('');

  private initAutoCompleteKeyword = async (): Promise<void> => {
    if (this.pokemonNames && this.pokemonEngNames) return;

    const pokemons = await this.pokemonRepository.find({ select: ['name', 'engName'] });
    const [names, engNames] = pokemons.reduce<string[][]>(
      ([accName, accEngName], { name, engName }) => {
        return [
          [...accName, name],
          [...accEngName, engName],
        ];
      },
      [[], []],
    );
    this.pokemonNames = names;
    this.pokemonEngNames = engNames;
  };

  private filterByChoSeong = (): string[] => {
    return this.pokemonNames.filter(keywordToFilter => {
      const choSeongKeyword = [...keywordToFilter].map(text => disassemble(text)[0]).join('');
      const disassembleKeyword = disassemble(this.searchKeyword).join('');
      return this.equals(choSeongKeyword, disassembleKeyword);
    });
  };

  private filterByKeyword = (searchType: SearchType): string[] => {
    const searchTexts = (() => {
      switch (searchType) {
        case SearchTypes.NO:
          return this.pokemonNoList;
        case SearchTypes.NAME:
          return this.pokemonNames;
        default:
          return this.pokemonEngNames;
      }
    })();
    return searchTexts.filter(keywordToFilter => this.equals(keywordToFilter, this.searchKeyword));
  };

  public getMatchedTexts = async (keyword: string): Promise<MatchedTexts> => {
    const select = <(keyof PokemonOfDatabase)[]>['no', 'name', 'engName'];

    let searchType = <SearchType>'';
    if (/^[0-9]/.test(keyword)) searchType = SearchTypes.NO;
    else if (/^[ㄱ-ㅎ가-힣]/.test(keyword)) searchType = SearchTypes.NAME;
    else searchType = SearchTypes.ENG_NAME;

    await this.initAutoCompleteKeyword(select);

    this.searchKeyword = assemble(disassemble(keyword));
    const matchedTexts = isConsonantAll(keyword) ? this.filterByChoSeong() : this.filterByKeyword(searchType);

    return { matchedTexts, searchType };
  };
}
