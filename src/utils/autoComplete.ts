import { assemble, disassemble, isConsonantAll } from 'hangul-js';
import { AutoCompleteKeyword, PokemonNames, SearchType, SearchTypes } from '../pokemon/pokemon.type';

export class AutoCompleteUtil {
  private searchKeyword: string;
  private searchType: SearchType;

  constructor(private readonly pokemonNames: PokemonNames) {}

  public getSearchType = (): SearchType => this.searchType;

  private equals = (searchText: string, regExp: string): boolean => {
    return new RegExp(`^${regExp}`, 'gi').test(searchText);
  };

  private disassembleText = (text: string) => disassemble(text).join('');

  private filterByChoSeong = (): string[] => {
    return this.pokemonNames.kor.filter(name => {
      const choSeongKeyword = [...name].map(text => disassemble(text)[0]).join('');
      const searchKeyword = this.disassembleText(this.searchKeyword);
      return this.equals(choSeongKeyword, searchKeyword);
    });
  };

  private filterByKeyword = (): string[] => {
    return this.pokemonNames[this.searchType].filter(name => {
      const keywordToFilter = this.disassembleText(name);
      const searchKeyword = this.disassembleText(this.searchKeyword);
      return this.equals(keywordToFilter, searchKeyword);
    });
  };

  public getAutoCompleteKeyword = (keyword: string): AutoCompleteKeyword[] => {
    this.searchType = /^[ㄱ-ㅎ가-힣]/.test(keyword) ? SearchTypes.KOR : SearchTypes.ENG;
    this.searchKeyword = assemble(disassemble(keyword));

    const matchedTexts = isConsonantAll(keyword) ? this.filterByChoSeong() : this.filterByKeyword();
    return matchedTexts.map(result => {
      const index = this.pokemonNames[this.searchType].findIndex(name => name === result);
      return { result, count: this.pokemonNames.count[index] };
    });
  };
}
