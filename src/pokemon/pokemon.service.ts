import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { assemble, disassemble, isConsonantAll, search } from 'hangul-js';
import { MongoRepository } from 'typeorm';
import { PokemonOfDatabase } from './model/pokemonOfDatabase.entity';

@Injectable()
export class PokemonService {
  private pokemonNames: string[];
  private searchKeyword: string;

  constructor(
    @InjectRepository(PokemonOfDatabase) private readonly pokemonRepository: MongoRepository<PokemonOfDatabase>,
  ) {}

  public async getPokemons(page = 1, display = 10): Promise<PokemonOfDatabase[]> {
    return this.pokemonRepository.find({
      skip: (page - 1) * display,
      take: display,
      order: { no: 'ASC' },
      cache: true,
    });
  }

  private filterByChoSeong(): string[] {
    return this.pokemonNames.filter(keywordToFilter => {
      const choSeongKeyword = [...keywordToFilter].map(text => disassemble(text)[0]).join('');
      const disassembleKeyword = disassemble(this.searchKeyword).join('');
      return search(choSeongKeyword, disassembleKeyword) > -1;
    });
  }

  private filterByKeyword(): string[] {
    return this.pokemonNames.filter(keywordToFilter => {
      return search(keywordToFilter, this.searchKeyword) > -1;
    });
  }
}
