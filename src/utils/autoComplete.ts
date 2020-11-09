import { assemble, disassemble, isConsonantAll } from 'hangul-js';
import { PokemonOfDatabase } from 'src/pokemon/model/pokemonOfDatabase.entity';
import { MongoRepository } from 'typeorm';

type SearchType = 'no' | 'name' | 'engName';
export type MatchedTexts = {
  matchedTexts: string[];
  searchType: SearchType;
};

export class AutoCompleteUtil {
  private pokemonNoList: string[];
  private pokemonNames: string[];
  private pokemonEngNames: string[];
  private searchKeyword: string;

  constructor(private readonly pokemonRepository: MongoRepository<PokemonOfDatabase>) {}

  private equals = (searchText: string, regExp: string): boolean => {
    return new RegExp(`^${regExp}`, 'gi').test(searchText);
  };

  private initAutoCompleteKeyword = async (select: (keyof PokemonOfDatabase)[]): Promise<void> => {
    if (this.pokemonNoList && this.pokemonNames && this.pokemonEngNames) return;

    const pokemons = await this.pokemonRepository.find({ select });
    const [noList, names, engNames] = pokemons.reduce<string[][]>(
      ([_no, _name, _engName], { no, name, engName }) => {
        return [
          [..._no, no],
          [..._name, name],
          [..._engName, engName],
        ];
      },
      [[], [], []],
    );
    this.pokemonNoList = noList;
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
        case 'no':
          return this.pokemonNoList;
        case 'name':
          return this.pokemonNames;
        default:
          return this.pokemonEngNames;
      }
    })();
    return searchTexts.filter(keywordToFilter => this.equals(keywordToFilter, this.searchKeyword));
  };

  public getMatchedTexts = async (keyword: string): Promise<MatchedTexts> => {
    const select = <(keyof PokemonOfDatabase)[]>['no', 'name', 'engName'];
    const searchType = (/^[0-9]/.test(keyword) && 'no') || (/^[ㄱ-ㅎ가-힣]/.test(keyword) && 'name') || 'engName';
    await this.initAutoCompleteKeyword(select);

    this.searchKeyword = assemble(disassemble(keyword));
    const matchedTexts = isConsonantAll(keyword) ? this.filterByChoSeong() : this.filterByKeyword(searchType);

    return { matchedTexts, searchType };
  };
}
