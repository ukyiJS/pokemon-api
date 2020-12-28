import { Test } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { Session } from '../types';
import { PokemonArgs } from './args/pokemon.args';
import { PokemonService } from './pokemon.service';

jest.setTimeout(10000);
describe('PokemonService', () => {
  let service: PokemonService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
    service = moduleRef.get<PokemonService>(PokemonService);
  });

  it('should return pokemon', async () => {
    const pokemon = await service.getPokemon('이브이');
    expect(pokemon).not.toBeUndefined();
  });

  it('should return pokemons', async () => {
    const pokemons = await service.getPokemons(<PokemonArgs>{});
    expect(pokemons).not.toHaveLength(0);
  });

  it.only('should return autoComplete keyword', async () => {
    const pokemons = await service.getAutoCompleteKeyword({ keyword: 'ㅇㅂㅇ', display: 10 }, <Session>{});
    expect(pokemons).not.toHaveLength(0);
  });
});
