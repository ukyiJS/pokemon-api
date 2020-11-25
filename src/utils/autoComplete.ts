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
