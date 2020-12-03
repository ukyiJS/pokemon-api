import { assemble, disassemble, isConsonantAll } from 'hangul-js';
import { LanguageType } from '../pokemon/model/languageType.entity';
import { AutoCompleteKeyword, PokemonName } from '../pokemon/pokemon.type';

export class AutoCompleteUtil {
  private searchKeyword: string;
  private searchType: keyof LanguageType;

  constructor(private readonly pokemonNames: PokemonName[]) {}

  public getSearchType = (): keyof LanguageType => this.searchType;

  private equals = (searchText: string, regExp: string): boolean => {
    return new RegExp(`^${regExp}`, 'gi').test(searchText);
  };

  private disassembleText = (text: string) => disassemble(text).join('');

  private filterByChoSeong = (): PokemonName[] => {
    return this.pokemonNames.filter(({ name }) => {
      const choSeongKeyword = [...name.kor].map(text => disassemble(text)[0]).join('');
      const searchKeyword = this.disassembleText(this.searchKeyword);
      return this.equals(choSeongKeyword, searchKeyword);
    });
  };

  private filterByKeyword = (): PokemonName[] => {
    return this.pokemonNames.filter(({ name }) => {
      const keywordToFilter = this.disassembleText(name[this.searchType]);
      const searchKeyword = this.disassembleText(this.searchKeyword);
      return this.equals(keywordToFilter, searchKeyword);
    });
  };

  public getAutoCompleteKeyword = (keyword: string): AutoCompleteKeyword[] => {
    this.searchType = /^[ㄱ-ㅎ가-힣]/.test(keyword) ? 'kor' : 'eng';
    this.searchKeyword = assemble(disassemble(keyword));

    const matchedPokemons = isConsonantAll(keyword) ? this.filterByChoSeong() : this.filterByKeyword();
    return matchedPokemons.map(({ name, searchCount }) => ({ result: name[this.searchType], searchCount }));
  };
}
