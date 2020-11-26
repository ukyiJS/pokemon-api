import { CacheModule } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { getMongoRepository, MongoRepository } from 'typeorm';
import { CacheService, TypeormService } from '../config';
import { PokemonArgs } from './args/pokemon.args';
import { PokemonOfDatabase } from './model/pokemonOfDatabase.entity';
import { PokemonService } from './pokemon.service';

jest.setTimeout(10000);
describe('PokemonService', () => {
  let service: PokemonService;
  let repository: MongoRepository<PokemonOfDatabase>;

  beforeAll(async () => {
    await Test.createTestingModule({
      imports: [
        CacheModule.registerAsync({ useClass: CacheService }),
        TypeOrmModule.forRootAsync({ useClass: TypeormService }),
      ],
      providers: [PokemonService, { provide: getRepositoryToken(PokemonOfDatabase), useClass: MongoRepository }],
    }).compile();

    repository = getMongoRepository(PokemonOfDatabase);
    service = new PokemonService(repository);
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
    const pokemons = await service.getAutoCompleteKeyword({ keyword: 'ㅇㅂㅇ', display: 10 });
    expect(pokemons).not.toHaveLength(0);
  });
});
